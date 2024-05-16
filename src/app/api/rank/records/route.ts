import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { db } from '@/app/lib/prisma';
import { LEVEL } from '@/app/lib/constants';
import { authOptions } from '@/app/lib/auth/options';

const schema = z.object({
  level: z.nativeEnum(LEVEL),
  time: z.number().int()
});

export const POST = async (req: NextRequest) => {
  try {
    const res = schema.safeParse(await req.json());
    if (!res.success) {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }
    const { level, time } = res.data;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await db.rank.create({
      data: {
        level,
        time,
        userId: session.user.id
      }
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

const pageSchema = z.object({
  current: z.number().int(),
  pageSize: z.number().int(),
  level: z.nativeEnum(LEVEL)
});

export const GET = async (req: NextRequest) => {
  try {
    const res = pageSchema.safeParse({
      current: Number(req.nextUrl.searchParams.get('current')),
      pageSize: Number(req.nextUrl.searchParams.get('pageSize')),
      level: Number(req.nextUrl.searchParams.get('level'))
    });
    if (!res.success) {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }
    const { current, pageSize, level } = res.data;
    const total = await db.rank.count({
      where: {
        level
      }
    });

    // sql rank join user

    const data = await db.rank.findMany({
      where: {
        level
      },
      orderBy: {
        time: 'asc'
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
            id: true,
            createdAt: true
          }
        }
      },
      skip: (current - 1) * pageSize,
      take: pageSize
    });

    return NextResponse.json(
      {
        data: data.map((v, i) => {
          return {
            ...v,
            rank: i + (current - 1) * pageSize + 1
          };
        }),
        total
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
