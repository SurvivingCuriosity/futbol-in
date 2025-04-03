import connectDb from "@/server/lib/db";
import Competicion, {
  ICompeticion,
} from "@/server/models/Competicion/Competicion.model";
import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";

export class CompeticionesService {

  static async crearCompeticion(
    competicion: Omit<CompeticionDTO, "id" | "createdByUserId">
  ): Promise<CompeticionDTO> {
    await connectDb();

    // Crear el documento
    const competicionCreada = await Competicion.create(competicion);

    return this.mapToDTO(competicionCreada);
  }

  static async actualizarCompeticion(
    idCompeticion: string,
    data: Partial<CompeticionDTO>
  ): Promise<CompeticionDTO> {
    await connectDb();
  
    const competicionActualizada = await Competicion.findOneAndUpdate(
      { _id: idCompeticion },
      { $set: data },
      { new: true }
    );
  
    if (!competicionActualizada) {
      throw new Error(`La competición con ID ${idCompeticion} no existe`);
    }
  
    return this.mapToDTO(competicionActualizada);
  }
  
  static async getAll(): Promise<CompeticionDTO[]> {
    await connectDb();

    const competiciones = await Competicion.find();

    return competiciones.map((c) => this.mapToDTO(c));
  }

  static async getById(id: string): Promise<CompeticionDTO> {
    await connectDb();

    const competicion = await Competicion.findById(id);

    if (!competicion) {
      throw new Error("No se encontró la competición");
    }

    return this.mapToDTO(competicion);
  }

  static mapToDTO(c: ICompeticion): CompeticionDTO {
    return {
      id: c._id.toString(),
      nombre: c.nombre,
      descripcion: c.descripcion,
      googlePlaceId: c.googlePlaceId,
      tipoDeCompeticion: c.tipoDeCompeticion,
      tipoDeFutbolin: c.tipoDeFutbolin,
      modalidadDeJuego: c.modalidadDeJuego,
      tipoInscripcion: c.tipoInscripcion,
      estadoCompeticion: c.estadoCompeticion,
      cantidadParejas: c.cantidadParejas,
      enfrentamientos: c.enfrentamientos.map((e) => e.toString()),
      equipos: c.equipos.map((e) => ({ ...e, id: e.id.toString() })),
      configuracionEnfrentamientos: c.configuracionEnfrentamientos,
      createdByUserId: c.createdByUserId.toString(),
    };
  }
}
