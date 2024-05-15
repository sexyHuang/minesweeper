import NextAuth from 'next-auth';

import { PrismaClient } from '@prisma/client';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@/app/lib/PrismaAdapter';

const prisma = new PrismaClient();
const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  debug: true
});

export { handler as GET, handler as POST };
