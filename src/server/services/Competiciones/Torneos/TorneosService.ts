import connectDb from "@/server/lib/db";
import {
  ITorneo,
  Torneo,
} from "@/server/models/Competicion/Torneos/Torneo.model";
import { TorneoDTO } from "@/server/models/Competicion/Torneos/TorneoDTO";

export class TorneosService {
  static async crearTorneo(
    torneo: Omit<TorneoDTO, "id" | "createdByUserId">
  ): Promise<TorneoDTO> {
    await connectDb();

    const torneoCreado = await Torneo?.create(torneo);

    return this.mapToDTO(torneoCreado);
  }

  static async actualizarTorneo(
    idTorneo: string,
    data: Partial<TorneoDTO>
  ): Promise<TorneoDTO> {
    await connectDb();

    const torneoActualizado = await Torneo?.findOneAndUpdate(
      { _id: idTorneo },
      { $set: data },
      { new: true }
    );

    if (!torneoActualizado) {
      throw new Error(`El torneo con ID ${idTorneo} no existe`);
    }

    return this.mapToDTO(torneoActualizado);
  }

  static async getAll(): Promise<TorneoDTO[]> {
    await connectDb();

    const torneos = (await Torneo?.find()) as ITorneo[];

    return torneos.map((c) => this.mapToDTO(c));
  }

  static async getById(id: string): Promise<TorneoDTO> {
    await connectDb();

    const torneo = await Torneo?.findById(id);

    if (!torneo) {
      throw new Error("No se encontró el torneo");
    }

    return this.mapToDTO(torneo);
  }

  static mapToDTO(c: ITorneo): TorneoDTO {
    return {
      id: c._id.toString(),
      nombre: c.nombre,
      descripcion: c.descripcion,
      googlePlaceId: c.googlePlaceId,
      tipoDeFutbolin: c.tipoDeFutbolin,
      modalidadDeJuego: c.modalidadDeJuego,
      tipoInscripcion: c.tipoInscripcion,
      estadoCompeticion: c.estadoCompeticion,
      cantidadParejas: c.cantidadParejas,
      enfrentamientos: c.enfrentamientos.map((e) => e.toString()),
      equipos: c.equipos.map((e) => ({
        estado: e.estado,
        id: e.id.toString(),
      })),
      configEnfrentamientos: c.configEnfrentamientos,
      createdByUserId: c.createdByUserId?.toString(),
    };
  }
}
