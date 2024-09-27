import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';

import {authOptions} from '@/lib/auth';
import prisma from '@/lib/prisma';

// import { runMiddleware } from "@/lib/cors";

export async function GET(req, { params }) {
    const { id } = params;

    // console.log(id);
    try {
    // await runMiddleware(req, NextResponse.next());
        const session = await getServerSession(authOptions);

        if (!session)
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const map = await prisma.map.findUnique({
            where: {
                id: parseInt(id),
                userId: session.user.id,
            },
            include: {
                locations: true,
                images: true,
            },
        });
        if (!map)
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        return NextResponse.json({ map: map }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: 'Error saving map' }, { status: 500 });
    }
}
