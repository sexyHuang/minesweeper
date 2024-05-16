import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { db } from '@/app/lib/prisma';
import { authOptions } from '@/app/lib/auth/options';

const schema = z.object({
  name: z.string()
});

export const POST = async (req: NextRequest) => {
  try {
    const res = schema.safeParse(await req.json());
    if (!res.success) {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }
    const { name } = res.data;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await db.user.update({
      where: {
        email: session.user.email!
      },
      data: {
        name
      }
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
