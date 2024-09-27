import {NextResponse} from 'next/server';
import {stripe} from '@/lib/stripe';
import {prisma} from '@/lib/prisma';

export async function POST(req) {
    const body = await req.text();
    const signature = req.headers.get('Stripe-Signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        return new NextResponse('Missing Webhook Secret', { status: 500 });
    }

    if (!signature) {
        return new NextResponse('Missing Stripe Signature', { status: 400 });
    }

    let event = null;

    try {
        console.log('Verifying webhook signature...');
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log('Webhook verified, event:', event);

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const subscriptionId = session.subscription;
                const userId = session.metadata.userId;

                console.log(`Checkout session completed for user ${userId}, subscription ${subscriptionId}`);

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
                console.log(`Unhandled event type ${event.type}`);
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error('Error verifying webhook:', error);
        return new NextResponse('Invalid Stripe Signature', { status: 400 });
    }
}
