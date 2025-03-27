import { bucket } from '@/server/lib/googleStorage';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    console.log('=====en el endpoint')
    const { searchParams } = new URL(request.url);
    console.log('=====en el endpoint seartch', searchParams)
    const filePath = searchParams.get("path") || "";

    console.log('el file path:', filePath);

    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 })
    }

    // Haz aquí tu lógica, por ejemplo generar Signed URL
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
