import { NextRequest } from 'next/server'
import { successResponse, errorResponse } from '@/server/lib/httpResponse'

import { UserService }   from '@/server/services/User/UserService'
import { EquipoService } from '@/server/services/Equipo/EquipoService'
import { SpotService }   from '@/server/services/Spots/SpotsService'

import { EstadoJugador } from 'futbol-in-core/enum'
import { IUserDocument } from '@/server/models/User/User.model'

/* 🆕 Bucket de GCS para firmar la URL */
import { bucket } from '@/server/lib/googleStorage'

export const runtime  = 'nodejs'
export const dynamic  = 'force-dynamic'

/** GET /api/mobile/user/profile?userId=<id> */
export async function GET(req: NextRequest) {
  try {
    /* 1. Parámetro requerido */
    const userId = req.nextUrl.searchParams.get('userId')
    if (!userId) {
      return errorResponse('Falta query param: userId', 400)
    }

    /* 2. Usuario completo */
    const fullUser = await UserService.findById(userId)
    if (!fullUser) {
      return errorResponse('Usuario no encontrado', 404)
    }

    /* 3. Equipos donde el usuario está ACEPTADO */
    const equipos       = await EquipoService.findManyById(fullUser.equipos)
    const equiposAceptados = equipos.filter((equipo) => {
      const jugador = equipo.jugadores.find((j) => j.usuario === fullUser.id)
      return jugador?.estado === EstadoJugador.ACEPTADO
    })

    /* 4. Futbolines creados por el usuario */
    const futbolines = await SpotService.getSpotsDeUsuario(fullUser.id)

    /* 5. 🆕 URL firmada de la imagen (válida 1 h) */
    let imageUrl: string | null = null
    if (fullUser.imagen) {
      try {
        const file = bucket.file(fullUser.imagen)
        const [signed] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 60 * 60 * 1000, // 1 h
        })
        imageUrl = signed
      } catch (err) {
        console.error('Error generando URL firmada:', err)
      }
    }

    /* 6. Serializamos datos y respondemos */
    return successResponse({
      user:       UserService.mapToDTO(fullUser as IUserDocument),
      equipos:    equiposAceptados,
      imagen:     imageUrl,        // 🆕 la ruta firmada (o null)
      futbolines,
    })
  } catch (err) {
    return errorResponse(err, 500)
  }
}
