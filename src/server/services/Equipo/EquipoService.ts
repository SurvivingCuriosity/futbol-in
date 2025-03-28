import { EstadoJugador } from "@/core/enum/Equipos/EstadoJugador";
import connectDb from "@/server/lib/db";
import { Equipo, IEquipoDocument } from "@/server/models/Equipo/Equipo.model";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { Types } from "mongoose";

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
  }

  static async findManyById(
    idsEquipos: Types.ObjectId[]
  ): Promise<EquipoDTO[]> {
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
