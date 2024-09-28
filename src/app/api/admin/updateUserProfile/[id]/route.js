import bcrypt from 'bcryptjs';
import {NextResponse} from 'next/server';

import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, email, password, isAdmin } = await req.json();

  try {
    const data = {
      name,
      email,
      // avatar,
      isAdmin
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user profile' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
