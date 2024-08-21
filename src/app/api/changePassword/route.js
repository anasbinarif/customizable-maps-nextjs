import { getSession } from 'next-auth/react';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { email: session.user.email },
        data: { password: hashedPassword },
    });

    return res.status(200).json({ message: 'Password updated successfully' });
}
