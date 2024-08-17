import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching places:', error);
        return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
    }
}
