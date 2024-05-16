import { db } from '@/app/lib/prisma';
import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

const getFilename = (filename: string) => {
  const [name, ext] = filename.split('.');
  return `${name}_${Date.now()}.${ext}`;
};

export const POST = async (request: Request): Promise<NextResponse> => {
  const session = await getServerSession(authOptions);
  const formData = await request.formData();
  const filename = getFilename(formData.get('filename')?.toString() ?? 'file');
  const file = formData.get('file') as File;
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const blob = await put(filename, file, {
      access: 'public'
    });
    await db.user.update({
      where: {
        email: session.user.email!
      },
      data: {
        image: blob.url
      }
    });
    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
