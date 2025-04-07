import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import connectDb from "@/server/lib/db";
import { ILiga, Liga } from "@/server/models/Competicion/Ligas/Liga.model";
import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import {
  EnfrentamientoDTO,
  IEnfrentamiento,
} from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { IPartido } from "@/server/models/Partido/Partido.model";
import { Types } from "mongoose";

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

    const ligas = (await Liga?.find()) as ILiga[];

    return ligas.map((c) => this.mapToDTO(c));
  }

  static async join(
    idLiga: string,
    idEquipo: Types.ObjectId
  ): Promise<LigaDTO> {
    await connectDb();
    const liga = (await Liga?.findById(idLiga)) as ILiga;
    if (!liga) {
      throw new Error("No se encontró la liga");
    }

    // Determinar el estado inicial (ACEPTADO o PENDIENTE)
    const estado =
      liga.tipoInscripcion === TipoInscripcion.ABIERTO
        ? EstadoEquipoCompeticion.ACEPTADO
        : EstadoEquipoCompeticion.PENDIENTE;

    // 1. Añadimos el nuevo equipo
    liga.equipos.push({ id: idEquipo, estado });

    // 2. Generamos los enfrentamientos del nuevo equipo contra los existentes
    const nuevosEnfrentamientos = generarEnfrentamientosLigaParaNuevoEquipo(
      liga,
      idEquipo
    );

    // 3. Añadimos al array de enfrentamientos
    liga.enfrentamientos.push(...nuevosEnfrentamientos);

    // 4. Guardamos en DB
    await liga.save();

    return this.mapToDTO(liga);
  }

  static async getById(id: string): Promise<LigaDTO> {
    await connectDb();

    const liga = await Liga?.findById(id);

    if (!liga) {
      throw new Error("No se encontró la liga");
    }

    return this.mapToDTO(liga);
  }

  static async getEnfrentamientos(
    idLiga: string
  ): Promise<EnfrentamientoDTO[]> {
    await connectDb();

    const liga = await Liga?.findById(idLiga) as ILiga;

    console.log(liga.enfrentamientos)

    const enfrentamientosMapeados: EnfrentamientoDTO[] = liga.enfrentamientos.map(
      (enf) => ({
        equipoA: enf.equipoA?.toString() ?? '',
        equipoB: enf.equipoB?.toString() ?? '',
        competicion: enf.competicion.toString() ?? '',
        partidos: (enf.partidos as IPartido[]).map((p) => ({
          enfrentamiento: p.enfrentamiento.toString() ?? '',
          equipoA: p.equipoA.toString() ?? '',
          equipoB: p.equipoB.toString() ?? '',
          golesEquipoA: p.golesEquipoA,
          golesEquipoB: p.golesEquipoB,
          finalizado: p.finalizado,
          ganador: p.ganador?.toString() ?? '',
        })),
        ganador: enf.ganador ? enf.ganador?.toString() ?? '' : null,
        jugado: enf.jugado,
      })
    );

    return enfrentamientosMapeados || [];
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
      configEnfrentamiento: {
        cantidadPartidos: c.configEnfrentamiento.cantidadPartidos,
        golesParaGanar: c.configEnfrentamiento.golesParaGanar,
      },
      createdByUserId: c.createdByUserId?.toString(),
      idaYVuelta: c.idaYVuelta,
    };
  }
}

function generarEnfrentamientosLigaParaNuevoEquipo(
  liga: ILiga,
  nuevoEquipoId: Types.ObjectId
): IEnfrentamiento[] {
  const esIdaYVuelta = liga.idaYVuelta;

  return liga.equipos
    .filter((eq) => !eq.id.equals(nuevoEquipoId))
    .flatMap((eq) => {
      // Enfrentamiento “ida”: eq -> A, nuevo -> B
      const ida: IEnfrentamiento = {
        competicion: liga._id,
        equipoA: eq.id,
        equipoB: nuevoEquipoId,
        partidos: [],
        ganador: null,
        jugado: false,
      };

      // Enfrentamiento “vuelta” (opcional)
      if (esIdaYVuelta) {
        const vuelta: IEnfrentamiento = {
          competicion: liga._id,
          equipoA: nuevoEquipoId,
          equipoB: eq.id,
          partidos: [],
          ganador: null,
          jugado: false,
        };
        return [ida, vuelta];
      }

      return [ida];
    });
}
