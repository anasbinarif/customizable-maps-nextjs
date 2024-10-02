import { NextResponse } from 'next/server';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('Stripe-Signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    logger.error('Missing Webhook Secret');

    return new NextResponse('Missing Webhook Secret', { status: 500 });
  }

  if (!signature) {
    logger.error('Missing Stripe Signature');

    return new NextResponse('Missing Stripe Signature', { status: 400 });
  }

  let event = null;

  try {
    logger.info('Verifying webhook signature...');
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    logger.info(`Webhook verified, event: ${event.type}`);

    switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const subscriptionId = session.subscription;
      const userId = session.metadata.userId;

      logger.info(`Checkout session completed for user ${userId}, subscription ${subscriptionId}`);

      await prisma.subscription.create({
        data: {
          stripeSubscriptionId: subscriptionId,
          subscriptionType: session.metadata.subscriptionType,
          status: 'active',
          userId: parseInt(userId),
        },
      });
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const stripeSubscriptionId = subscription.id;

      await prisma.subscription.update({
        where: { stripeSubscriptionId },
        data: {
          status: 'canceled',
        },
      });
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;

      await prisma.subscription.update({
        where: { stripeSubscriptionId: subscriptionId },
        data: {
          status: 'pending',
        },
      });
      break;
    }

    default:
      logger.warn(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    logger.error('Invalid Stripe Signature');

    return new NextResponse('Invalid Stripe Signature', { status: 400 });
  }
}
