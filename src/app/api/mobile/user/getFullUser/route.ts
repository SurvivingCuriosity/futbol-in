// src/app/api/mobile/user/profile/route.ts
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/server/lib/httpResponse";

import { UserService }   from "@/server/services/User/UserService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { SpotService }   from "@/server/services/Spots/SpotsService";

import { EstadoJugador } from "futbol-in-core/enum";
import { IUserDocument } from "@/server/models/User/User.model";

/* Ejecutamos siempre en Node.js (no Edge) */
export const runtime  = "nodejs";
/* Queremos respuesta fresh, sin ISR */
export const dynamic  = "force-dynamic";

/** GET /api/mobile/user/profile?userId=<id> */
export async function GET(req: NextRequest) {
  try {
    /* 1. Parámetro requerido */
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return errorResponse("Falta query param: userId", 400);
    }

    /* 2. Usuario completo */
    const fullUser = await UserService.findById(userId);
    if (!fullUser) {
      return errorResponse("Usuario no encontrado", 404);
    }

    /* 3. Equipos donde el usuario está ACEPTADO */
    const equipos = await EquipoService.findManyById(fullUser.equipos);
    const equiposAceptados = equipos.filter((equipo) => {
      const jugador = equipo.jugadores.find((j) => j.usuario === fullUser.id);
      return jugador?.estado === EstadoJugador.ACEPTADO;
    });

    /* 4. Futbolines creados por el usuario */
    const futbolines = await SpotService.getSpotsDeUsuario(fullUser.id);

    /* 5. Serializamos datos y respondemos */
    return successResponse({
      user:      UserService.mapToDTO(fullUser as IUserDocument),
      equipos:   equiposAceptados,
      futbolines,
    });
  } catch (err) {
    return errorResponse(err, 500);
  }
}
