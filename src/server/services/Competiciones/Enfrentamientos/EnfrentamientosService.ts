// EnfrentamientosService.ts

import { CompletarPartidosRequest, CompletarPartidosResponse } from "@/client/shared/client/types/Competiciones/Enfrentamientos/CompletarPartidosRequest";
import connectDb from "@/server/lib/db";
import { Liga } from "@/server/models/Competicion/Ligas/Liga.model";
import Enfrentamiento from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { Partido } from "@/server/models/Partido/Partido.model";
import mongoose from "mongoose";

export class EnfrentamientosService {
  static async completarPartidos(
    data: CompletarPartidosRequest
  ): Promise<CompletarPartidosResponse> {
    await connectDb();

    const { idLiga, idEnfrentamiento, partidos } = data;

    // 1. Verificar que existe la liga
    const liga = await Liga?.findById(idLiga);
    if (!liga) {
      throw new Error(`La liga con id ${idLiga} no existe`);
    }

    // 2. Procesar cada partido de la petición
    const nuevosIds: mongoose.Types.ObjectId[] = [];
    for (const p of partidos) {
      if (p.id) {
        // a) Si viene con id, actualizar el partido existente
        await Partido.findByIdAndUpdate(p.id, {
          equipoA: p.equipoA,
          equipoB: p.equipoB,
          golesEquipoA: p.golesEquipoA,
          golesEquipoB: p.golesEquipoB,
          finalizado: true,
          ganador: p.ganador,
        }, { new: true });
        nuevosIds.push(new mongoose.Types.ObjectId(p.id));
      } else {
        // b) Si no tiene id, crearlo y guardar su _id
        const creado = await Partido.create({
          enfrentamiento: idEnfrentamiento,
          equipoA: p.equipoA,
          equipoB: p.equipoB,
          golesEquipoA: p.golesEquipoA,
          golesEquipoB: p.golesEquipoB,
          finalizado: true,
          ganador: p.ganador,
        });
        nuevosIds.push(creado._id as mongoose.Types.ObjectId);
      }
    }


    // 3. Reemplazar en el Enfrentamiento su array partidos
    await Enfrentamiento.findByIdAndUpdate(idEnfrentamiento, {
      partidos: nuevosIds,
      jugado: true,
      ganador: partidos[0].equipoA
    });

    return { success: true };
  }
}
