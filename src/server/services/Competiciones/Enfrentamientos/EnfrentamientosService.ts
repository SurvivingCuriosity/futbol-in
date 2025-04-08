// EnfrentamientosService.ts

import { CompletarPartidosRequest, CompletarPartidosResponse } from "@/client/shared/client/types/Competiciones/Enfrentamientos/CompletarPartidosRequest";
import connectDb from "@/server/lib/db";
import { Liga } from "@/server/models/Competicion/Ligas/Liga.model"; // por si validas la existencia
import Enfrentamiento from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { Partido } from "@/server/models/Partido/Partido.model";

export class EnfrentamientosService {
  static async completarPartidos(
    data: CompletarPartidosRequest
  ): Promise<CompletarPartidosResponse> {
    await connectDb();

    const { idLiga, idEnfrentamiento, partidos } = data;

    // 1. Verificar que existe la liga (opcional, si quieres)
    const liga = await Liga?.findById(idLiga);
    if (!liga) {
      throw new Error(`La liga con id ${idLiga} no existe`);
    }

    // 2. Para cada “PartidoACompletar”, creamos un documento “Partido”
    //    y lo asociamos al “Enfrentamiento” correspondiente
    for (const p of partidos) {
      // Crear el partido
      const docPartido = await Partido.create({
        enfrentamiento: idEnfrentamiento,
        equipoA: p.equipoA,
        equipoB: p.equipoB,
        golesEquipoA: p.golesEquipoA,
        golesEquipoB: p.golesEquipoB,
        finalizado: p.finalizado,
        ganador: p.ganador,
      });

      // Vincularlo en el “Enfrentamiento”. 
      // Este “Enfrentamiento” debe tener un campo “partidos: ObjectId[]”
      await Enfrentamiento.findByIdAndUpdate(idEnfrentamiento, {
        $push: { partidos: docPartido._id },
      });
    }

    // 3. Retornar respuesta
    return { success: true };
  }
}
