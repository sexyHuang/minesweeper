import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql` 
    CREATE TABLE users
    (
      id SERIAL,
      name VARCHAR(255),
      email VARCHAR(255),
      "emailVerified" TIMESTAMPTZ,
      image TEXT,
     
      PRIMARY KEY (id)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
