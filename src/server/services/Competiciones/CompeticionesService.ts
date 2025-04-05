import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import connectDb from "@/server/lib/db";
import Competicion, {
  ICompeticion,
} from "@/server/models/Competicion/Competicion.model";
import { CompeticionDTO, EquipoInscritoDTO } from "@/server/models/Competicion/CompeticionDTO";
import { Types } from "mongoose";
import { EquipoService } from "../Equipo/EquipoService";
import { UserService } from "../User/UserService";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";

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

  static async joinCompeticion(
    idCompeticion: string,
    idEquipo: Types.ObjectId
  ): Promise<CompeticionDTO> {
    await connectDb();
    const competicion = await Competicion.findById(idCompeticion);
    if (!competicion)
      throw new Error("No se encontró la competición en la base de datos");

    const estado =
      competicion.tipoInscripcion === TipoInscripcion.ABIERTO
        ? EstadoEquipoCompeticion.ACEPTADO
        : EstadoEquipoCompeticion.PENDIENTE;

    competicion.equipos.push({ id: idEquipo, estado });
    await competicion.save();
    return this.mapToDTO(competicion);
  }

    static async responderInscripcion(
      idCompeticion: string,
      idEquipo: Types.ObjectId,
      aceptado: boolean
    ): Promise<CompeticionDTO> {
      await connectDb();
      const competicion = await Competicion.findById(idCompeticion);
      if (!competicion)
        throw new Error("No se encontró la competición en la base de datos");
    
      if (aceptado === false) {
        competicion.equipos = competicion.equipos.filter(
          (e) => !e.id.equals(idEquipo)
        );
      } else {
        competicion.equipos = competicion.equipos.map((e) => {
          if (e.id.equals(idEquipo)) {
            e.estado = EstadoEquipoCompeticion.ACEPTADO;
          }
          return e;
        });
      }
    
      await competicion.save();
      return this.mapToDTO(competicion);
    }
    

  static async getEquipoInscrito(
    idCompeticion: string,
    idUsuario: string
  ): Promise<EquipoInscritoDTO | undefined> {
    await connectDb();
    const competicion = await Competicion.findById(idCompeticion);

    if (!competicion) throw new Error("No se encontró la competición");

    const userDb = await UserService.findById(idUsuario.toString());
    if (!userDb) throw new Error("No se encontró al usuario");

    const equiposUsuario = await EquipoService.findManyById(userDb.equipos);
    const idsEquiposUsuario = equiposUsuario.map((e) => e.id);

    const equipoInscrito = competicion.equipos.find((e) =>
      idsEquiposUsuario.includes(e.id.toString())
    );

    if(!equipoInscrito) return undefined

    return {
      id: equipoInscrito.id.toString(),
      estado: equipoInscrito.estado,
    }
  }

  static async getAll(tipoCompeticion?:TipoCompeticion|undefined): Promise<CompeticionDTO[]> {
    await connectDb();

    const competiciones = await Competicion.find();

    if(tipoCompeticion) {
      const mapeadas = competiciones.map((c) => this.mapToDTO(c));
      return mapeadas.filter((c) => c.tipoDeCompeticion === tipoCompeticion);
    } else {
      return competiciones.map((c) => this.mapToDTO(c));
    }
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
      equipos: c.equipos.map((e) => ({ estado: e.estado, id: e.id.toString() })),
      configuracionEnfrentamientos: c.configuracionEnfrentamientos,
      createdByUserId: c.createdByUserId.toString(),
    };
  }
}
