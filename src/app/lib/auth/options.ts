import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/app/lib/prisma';
import { comparePassword } from '@/app/lib/password';

export const authOptions: NextAuthOptions = {
  //debug: true,
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    CredentialsProvider({
      id: 'emailPassword',
      name: 'Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials ?? {};
          if (!email || !password) {
            throw new Error('email and password are required');
          }
          const user = await db.user.findUnique({
            where: { email }
          });
          // 用户不存在
          if (!user) {
            throw new Error('Incorrect email or password');
          }
          // 用户未设置密码
          if (!user.password) {
            throw new Error(
              'Account not init password, Please use email verification'
            );
          }
          // 密码不正确
          if (!comparePassword(password, user.password)) {
            throw new Error('Incorrect email or password');
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email
          };
        } catch (err: any) {
          console.log(err?.message);

          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email!
        }
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return {
        ...token,
        picture: dbUser.image,
        name: dbUser.name,
        noPwd: !dbUser.password
      };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          noPwd: token.noPwd
        };
      }

      return session;
    }
  }
};
