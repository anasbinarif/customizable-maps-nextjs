import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const maps = await prisma.map.findMany({
            include: {
                locations: true,  // Include associated locations
                user: true,       // Include associated user details
            },
        });

        return NextResponse.json({ maps }, { status: 200 });
    } catch (e) {
        console.error('Error fetching maps:', e);
        return NextResponse.json({ error: 'Error fetching maps' }, { status: 500 });
    }
}
