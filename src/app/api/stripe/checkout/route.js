import {NextResponse} from 'next/server';

import {stripe} from '@/lib/stripe';

export async function POST(req) {

    const {userId, userEmail} = await req.json();

    if (!userId || !userEmail) {
        return NextResponse.json({ error: 'user id and email are required' }, { status: 400 });
    }

    const subscriptionType = 'PRO';
    const priceId = 'price_pro';

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/checkout-success',
        cancel_url: 'http://localhost:3000/user/subscriptions',
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: userEmail,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        metadata: {
            userId: userId,
            subscriptionType: subscriptionType,
        },
        subscription_data: {
            trial_settings: {
                end_behavior: {
                    missing_payment_method: 'cancel',
                },
            },
            trial_period_days: 7,
        },
    });

    return new Response(JSON.stringify({ sessionId: stripeSession.id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
