import { bucket } from '@/server/lib/googleStorage'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    // 1. Recibimos el FormData
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file found' }, { status: 400 })
    }

    // 2. Convertimos el File en Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 3. Obtenemos un "tipo" para la carpeta, por si subimos a usuarios/equipos
    const type = formData.get('type') === 'team' ? 'imagenes-equipo' : 'imagenes-perfil'
    
    // 4. Nombre único del archivo
    const uniqueName = `${uuidv4()}-${file.name}` 
    // Ruta interna (carpeta) donde se sube
    const filePath = `${type}/${uniqueName}`

    // 5. Subir al bucket (sin acceso público)
    const fileUpload = bucket.file(filePath)
    await fileUpload.save(buffer, {
      metadata: { contentType: file.type }
    })

    // 6. En la BD normalmente guardarías `filePath` para este user/team
    // Por ahora, devolvemos la ruta interna como referencia
    return NextResponse.json({ path: filePath })
    
  } catch (error) {
    console.error('EL ERRRORRR=====')
    console.error(error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}
