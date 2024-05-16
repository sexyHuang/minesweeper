import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { db } from '@/app/lib/prisma';
import { comparePassword, hashPassword } from '@/app/lib/password';
import { authOptions } from '@/app/lib/auth/options';

const schema = z.object({
  password: z.string(),
  oldPassword: z.string().optional()
});

export const POST = async (req: NextRequest) => {
  try {
    const res = schema.safeParse(await req.json());
    if (!res.success) {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }
    const { password, oldPassword } = res.data;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.user.noPwd) {
      if (!oldPassword) {
        return NextResponse.json(
          { error: 'Please provide old password' },
          { status: 400 }
        );
      }
      const user = await db.user.findUnique({
        where: {
          email: session.user.email!
        }
      });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 });
      }
      if (comparePassword(oldPassword, user.password!)) {
        return NextResponse.json(
          { error: 'Old password is incorrect' },
          { status: 400 }
        );
      }
    }
    await db.user.update({
      where: {
        email: session.user.email!
      },
      data: {
        password: hashPassword(password)
      }
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
