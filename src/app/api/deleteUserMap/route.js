import {NextResponse} from 'next/server';

import prisma from '@/lib/prisma';

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Map ID is required' }, { status: 400 });
    }

    const map = await prisma.map.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ map }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Error deleting map' }, { status: 500 });
  }
}
