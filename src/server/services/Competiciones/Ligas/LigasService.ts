import connectDb from "@/server/lib/db";
import { ILiga, Liga } from "@/server/models/Competicion/Ligas/Liga.model";
import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";

export class LigasService {
  static async crearLiga(
    liga: Omit<LigaDTO, "id" | "createdByUserId">
  ): Promise<LigaDTO> {
    await connectDb();

    const ligaCreada = await Liga?.create(liga);

    return this.mapToDTO(ligaCreada);
  }

  static async actualizarLiga(
    idLiga: string,
    data: Partial<LigaDTO>
  ): Promise<LigaDTO> {
    await connectDb();

    const ligaActualizada = await Liga?.findOneAndUpdate(
      { _id: idLiga },
      { $set: data },
      { new: true }
    );

    if (!ligaActualizada) {
      throw new Error(`La liga con ID ${idLiga} no existe`);
    }

    return this.mapToDTO(ligaActualizada);
  }

  static async getAll(): Promise<LigaDTO[]> {
    await connectDb();

    const ligas = await Liga?.find() as ILiga[];

    return ligas.map((c) => this.mapToDTO(c));
  }

  static async getById(id: string): Promise<LigaDTO> {
    await connectDb();

    const liga = await Liga?.findById(id);

    if (!liga) {
      throw new Error("No se encontró la liga");
    }

    return this.mapToDTO(liga);
  }

  static mapToDTO(c: ILiga): LigaDTO {
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
      configEnfrentamiento: c.configEnfrentamiento,
      createdByUserId: c.createdByUserId?.toString(),
    };
  }
}
