import { EstadoJugador } from "futbol-in-core/enum";
import connectDb from "@/server/lib/db";
import { Equipo, IEquipoDocument } from "@/server/models/Equipo/Equipo.model";
import { Types } from 'mongoose';
import { revalidatePath } from "next/cache";
import { EquipoDTO } from "futbol-in-core/types";

export class EquipoService {
  static async crearEquipo(
    equipoACrear: Omit<EquipoDTO, "id">
  ): Promise<IEquipoDocument> {
    await connectDb();
    const equipo = new Equipo(equipoACrear);
    return equipo.save();
  }

  static async findById(idEquipo: string): Promise<EquipoDTO> {
    await connectDb();
    const equipo = await Equipo.findById(idEquipo);
    return this.mapToDTO(equipo);
  }

  static async eliminarEquipo(idEquipo: string): Promise<void> {
    await connectDb();
    await Equipo.findByIdAndDelete(idEquipo);
    revalidatePath('/perfil')
  }

  static async getEquiposDeUsuario(idUsuario: string): Promise<EquipoDTO[]> {
    await connectDb();

    const userObjectId = new Types.ObjectId(idUsuario);

    const equipos = await Equipo.find({
      $or: [
        { createdByUserId: userObjectId },
        { "jugadores.usuario": userObjectId }
      ]
    });

    return equipos.map(e => this.mapToDTO(e));
  }

  static async findManyById(
    idsEquipos: Types.ObjectId[] | undefined
  ): Promise<EquipoDTO[]> {
    if(!idsEquipos) return []
    await connectDb();
    const equipos = await Equipo.find({ _id: { $in: idsEquipos } });
    return equipos.map((e) => this.mapToDTO(e));
  }

  static async responderInvitacion(
    idEquipo: string,
    idJugador: string,
    estado: EstadoJugador
  ): Promise<void> {
    await connectDb();

    await Equipo.updateOne(
      { _id: idEquipo, "jugadores.usuario": idJugador },
      { $set: { "jugadores.$.estado": estado } }
    );
  }


  static mapToDTO(equipo: IEquipoDocument): EquipoDTO {
    return {
      id: equipo._id.toString(),
      nombreEquipo: equipo.nombreEquipo,
      imagenEquipo: equipo.imagenEquipo,
      jugadores: equipo.jugadores.map((j) => ({
        nombre: j.nombre,
        usuario: j.usuario?.toString() || null,
        estado: j.estado,
      })),
      createdByUserId: equipo.createdByUserId.toString(),
    };
  }
}
