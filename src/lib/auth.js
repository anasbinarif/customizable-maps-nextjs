import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {NextResponse} from 'next/server';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';

const login = async (credentials) => {

  const user = await prisma.user.findUnique({
    where: { email: credentials.email.toLowerCase() },
  });

  if (!user) throw new Error('Wrong email!');

  const isPasswordCorrect = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isPasswordCorrect) throw new Error('Wrong password!');

  return user;
  
};

export const authOptions = {
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);

          if (user) {
            const accessToken = await jwt.sign(
              { userId: user.id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: '2h' }
            );

            return { ...user, accessToken };
          }

          return null;
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async signIn({account}) {
      if (account.provider === 'credentials') {
        return true;
      } else if (account.provider === 'email') {
        return true;
      }

      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.username = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        // Additional fields as needed
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
        // Additional fields as needed
      }

      return session;
    },
  },
};

export const verifyToken = async (req) => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: 'Access Token Required' }),
      { status: 401 }
    );
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    return null;
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
      status: 403,
    });
  }
};
