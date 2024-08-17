import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get('email');

        if (!userEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const maps = await prisma.map.findMany({
            where: {
                user: {
                    email: userEmail,
                },
            },
            include: {
                locations: true,  // Include associated locations
            },
        });

        return NextResponse.json({ maps }, { status: 200 });
    } catch (e) {
        console.error('Error fetching user maps:', e);
        return NextResponse.json({ error: 'Error fetching user maps' }, { status: 500 });
    }
}
