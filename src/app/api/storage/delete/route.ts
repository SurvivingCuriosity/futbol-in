import { bucket } from '@/server/lib/googleStorage';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { path } = await request.json();

    console.log('path en endpoint:', path)

    if (!path) {
      return NextResponse.json({ error: 'No path provided' }, { status: 400 });
    }

    // 1. Referenciamos el archivo en el bucket
    const file = bucket.file(path);

    // 2. Borramos el archivo
    await file.delete();

    // 3. Devolvemos la misma ruta como confirmación
    return NextResponse.json({ path });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting file' }, { status: 500 });
  }
}
