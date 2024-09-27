import {NextResponse} from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        maps: true,  // Include related maps if needed
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}
