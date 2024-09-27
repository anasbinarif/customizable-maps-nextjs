import bcrypt from 'bcryptjs';
import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth/next';

import {authOptions} from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // console.log(session);

        const { currentPassword, newPassword } = await req.json();

        // console.log(newPassword);

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        // console.log(user);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // console.log(hashedPassword);

        await prisma.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword },
        });

        return NextResponse.json(
            { message: 'Password updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
