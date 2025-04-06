import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import connectDb from "@/server/lib/db";
import {
  CompeticionBase,
  ICompeticionBase,
} from "@/server/models/Competicion/CompeticionBase/Competicion.model";
import { CompeticionBaseDTO } from "@/server/models/Competicion/CompeticionBase/CompeticionBaseDTO";
import { Types } from "mongoose";

export class CompeticioneService {
  static async actualizarCompeticion(
    idCompeticion: string,
    data: Partial<CompeticionBaseDTO>
  ): Promise<CompeticionBaseDTO> {
    await connectDb();

    const competicionActualizada = await CompeticionBase.findOneAndUpdate(
      { _id: idCompeticion },
      { $set: data },
      { new: true }
    );

    if (!competicionActualizada) {
      throw new Error(`El torneo con ID ${idCompeticion} no existe`);
    }

    return this.mapToDTO(competicionActualizada);
  }

  static async join(
    idLiga: string,
    idEquipo: Types.ObjectId
  ): Promise<CompeticionBaseDTO> {
    await connectDb();
    const liga = await CompeticionBase.findById(idLiga);
    if (!liga) throw new Error("No se encontró la liga en la base de datos");

    const estado =
      liga.tipoInscripcion === TipoInscripcion.ABIERTO
        ? EstadoEquipoCompeticion.ACEPTADO
        : EstadoEquipoCompeticion.PENDIENTE;

    liga.equipos.push({ id: idEquipo, estado });
    await liga.save();
    return this.mapToDTO(liga);
  }

  static async responderInscripcion(
    idLiga: string,
    idEquipo: Types.ObjectId,
    aceptado: boolean
  ): Promise<CompeticionBaseDTO> {
    await connectDb();
    const liga = await CompeticionBase.findById(idLiga);
    if (!liga) throw new Error("No se encontró la liga en la base de datos");

    if (aceptado === false) {
      liga.equipos = liga.equipos.filter((e) => !e.id.equals(idEquipo));
    } else {
      liga.equipos = liga.equipos.map((e) => {
        if (e.id.equals(idEquipo)) {
          e.estado = EstadoEquipoCompeticion.ACEPTADO;
        }
        return e;
      });
    }

    await liga.save();
    return this.mapToDTO(liga);
  }

  static mapToDTO(c: ICompeticionBase): CompeticionBaseDTO {
    return {
      id: c._id.toString(),
      nombre: c.nombre,
      descripcion: c.descripcion,
      googlePlaceId: c.googlePlaceId,
      tipoDeFutbolin: c.tipoDeFutbolin,
      modalidadDeJuego: c.modalidadDeJuego,
      tipoInscripcion: c.tipoInscripcion,
      estadoCompeticion: c.estadoCompeticion,
      equipos: c.equipos.map((e) => ({
        estado: e.estado,
        id: e.id.toString(),
      })),
      cantidadParejas: c.cantidadParejas,
      createdByUserId: c.createdByUserId?.toString(),
    };
  }
}
