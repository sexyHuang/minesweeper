import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

const getFilename = (filename: string) => {
  const [name, ext] = filename.split('.');
  return `${name}_${Date.now()}.${ext}`;
};

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const filename = getFilename(formData.get('filename')?.toString() ?? 'file');
  const file = formData.get('file') as File;

  try {
    const blob = await put(filename, file, {
      access: 'public'
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
