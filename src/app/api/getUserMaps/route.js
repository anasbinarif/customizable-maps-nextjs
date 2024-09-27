import {NextResponse} from 'next/server';

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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
        locations: true,
        images: true,
      },
    });

    return NextResponse.json({ maps }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Error fetching user maps' }, { status: 500 });
  }
}
