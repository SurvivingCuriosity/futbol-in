import { bucket } from '@/server/lib/googleStorage';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get("path") || "";

    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 })
    }

    const file = bucket.file(filePath)
    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000,
    })

    return NextResponse.json({ url: signedUrl })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error generating signed URL' }, { status: 500 })
  }
}
