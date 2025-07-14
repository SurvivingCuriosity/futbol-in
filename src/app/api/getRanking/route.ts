import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/server/lib/httpResponse";
import { UserService } from "@/server/services/User/UserService";
import { UsuarioEnRanking } from "futbol-in-core/types";

export async function GET(req: NextRequest) {
  try {
    /* -------------------------------------------------- */
    /* 1. Leer query (?limit)                             */
    /* -------------------------------------------------- */
    const limitParam = req.nextUrl.searchParams.get("limit");
    const limit = limitParam ? Math.max(1, Number(limitParam)) : undefined;

    /* -------------------------------------------------- */
    /* 2. Obtener todos los usuarios una sola vez         */
    /* -------------------------------------------------- */
    const users = await UserService.getAll();

    /* -------------------------------------------------- */
    /* 3. Map + puntuación                                */
    /* -------------------------------------------------- */
    const usersParaRanking: UsuarioEnRanking[] = users.map((user, index) => ({
      id: user.id,
      usuario: user.name,
      posicion: index,
      spotsCreados: user.stats.lugaresAgregados,
      spotsVotados: user.stats.lugaresRevisados,
      spotsVerificados: user.stats.lugaresVerificados,
      puntuacion: getPuntuacion(
        user.stats.lugaresAgregados ?? 0,
        user.stats.lugaresRevisados ?? 0,
        user.stats.lugaresVerificados ?? 0
      ),
    }));

    return successResponse(
      limit ? usersParaRanking.slice(0, limit) : usersParaRanking
    );
  } catch (err) {
    return errorResponse(err);
  }
}

/* Queremos datos fresh, no static generation */
export const dynamic = "force-dynamic";

function getPuntuacion(
  lugaresAgregados: number,
  lugaresRevisados: number,
  lugaresVerificados: number
) {
  const puntuacion =
    lugaresAgregados * 5 + lugaresRevisados * 2 + lugaresVerificados * 2;
  return puntuacion;
}
