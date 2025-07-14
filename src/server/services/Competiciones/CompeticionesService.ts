import { EstadoEquipoCompeticion } from "futbol-in-core/enum";
import { TipoInscripcion } from "futbol-in-core/enum";
import connectDb from "@/server/lib/db";
import {
  CompeticionBase,
  ICompeticionBase,
} from "@/server/models/Competicion/CompeticionBase/Competicion.model";
import { CompeticionBaseDTO } from "futbol-in-core/types";
import { EquipoCompeticionDTO } from "futbol-in-core/types";
import { Types } from "mongoose";
import { EquipoService } from "../Equipo/EquipoService";
import { UserService } from "../User/UserService";

export class CompeticionesService {
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

  static async getEquipoInscrito(
    idCompeticion: string,
    idUsuario: string
  ): Promise<EquipoCompeticionDTO | undefined> {
    await connectDb();
    const competicion = (await CompeticionBase?.findById(idCompeticion)) as ICompeticionBase;

    if (!competicion) throw new Error("No se encontró el torneo");

    const userDb = await UserService.findById(idUsuario.toString());
    if (!userDb) throw new Error("No se encontró al usuario");

    const equiposUsuario = await EquipoService.findManyById(userDb.equipos);
    const idsEquiposUsuario = equiposUsuario.map((e) => e.id);

    const equipoInscrito = competicion.equipos.find((e) =>
      idsEquiposUsuario.includes(e.id.toString())
    );

    if (!equipoInscrito) return undefined;

    return {
      id: equipoInscrito.id.toString(),
      estado: equipoInscrito.estado,
    };
  }

  static async getCompeticionesDeUsuario(idUsuario: string): Promise<CompeticionBaseDTO[]> {
    await connectDb();
    
    if(!idUsuario) return []
    const equipos = await EquipoService.getEquiposDeUsuario(idUsuario);
    const idsEquipos = equipos.map((e) => e.id);

    const competiciones = await CompeticionBase.find({
      equipos: {
        $elemMatch: {
          id: {
            $in: idsEquipos,
          },
        },
      },
    }).lean<ICompeticionBase[]>();

    return competiciones.map((c) => this.mapToDTO(c));
  }

  static mapToDTO(c: ICompeticionBase): CompeticionBaseDTO {
    return {
      id: c._id.toString(),
      nombre: c.nombre,
      tipoCompeticion: c.tipoCompeticion,
      descripcion: c.descripcion,
      googlePlaceId: c.googlePlaceId,
      ciudad:c.ciudad,
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
