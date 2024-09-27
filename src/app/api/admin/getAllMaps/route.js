import {NextResponse} from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const maps = await prisma.map.findMany({
            include: {
                locations: true,  // Include associated locations
                user: true,       // Include associated user details
            },
        });

        return NextResponse.json({ maps }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: 'Error fetching maps' }, { status: 500 });
    }
}
