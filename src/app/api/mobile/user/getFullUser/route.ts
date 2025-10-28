import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { NextRequest } from "next/server";

import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";

import { IUserDocument } from "@/server/models/User/User.model";

import { bucket } from "@/server/lib/googleStorage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    /* 4. Futbolines creados por el usuario */
    const futbolines = await SpotService.getSpotsDeUsuario(fullUser.id);

    /* 5. 🆕 URL firmada de la imagen (válida 1 h) */
    let imageUrl: string | null = null;
    if (fullUser.imagen) {
      try {
        const file = bucket.file(fullUser.imagen);
        const [signed] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + 60 * 60 * 1000, // 1 h
        });
        imageUrl = signed;
      } catch (err) {
        console.error("Error generando URL firmada:", err);
      }
    }

    /* 6. Serializamos datos y respondemos */
    return successResponse({
      user: UserService.mapToDTO(fullUser as IUserDocument),
      imagen: imageUrl, // 🆕 la ruta firmada (o null)
      futbolines,
    });
  } catch (err) {
    return errorResponse(err, 500);
  }
}
