import connectDb from "@/server/lib/db";
import Competicion, { ICompeticion } from "@/server/models/Competicion/Competicion.model";
import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";

export class CompeticionesService {
  // Creación
  static async crearCompeticion(
    competicion: Omit<CompeticionDTO, "id" | "createdByUserId">
  ): Promise<CompeticionDTO> {
    await connectDb();

    // Crear el documento
    const competicionCreada = await Competicion.create(competicion);

    return this.mapToDTO(competicionCreada);
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
      nombre: c.nombre || 'hardcoded',
      descripcion: c.descripcion || 'hardcoded',
      googlePlaceId: c.googlePlaceId || 'hardcoded',
      tipoDeCompeticion: c.tipoDeCompeticion,
      tipoDeFutbolin: c.tipoDeFutbolin,
      modalidadDeJuego: c.modalidadDeJuego,
      cantidadParejas: c.cantidadParejas,
      enfrentamientos: c.enfrentamientos.map((e) => e.toString()),
      equipos: c.equipos.map((e) => e.toString()),
      configuracionEnfrentamientos: c.configuracionEnfrentamientos,
      createdByUserId: c.createdByUserId.toString(),
    };
  }
}
