import { EliminarLigaResponse } from "@/client/shared/client/types/Competiciones/Ligas/EliminarLiga";
import { EstadoEquipoCompeticion } from "futbol-in-core/enum";
import { TipoCompeticion } from "futbol-in-core/enum";
import { TipoInscripcion } from "futbol-in-core/enum";
import connectDb from "@/server/lib/db";
import { ILiga, Liga } from "@/server/models/Competicion/Ligas/Liga.model";
import { EnfrentamientoDTO, LigaDTO } from "futbol-in-core/types";
import Enfrentamiento, {
  IEnfrentamiento,
} from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import "@/server/models/Partido/Partido.model";
import { IPartido, Partido } from "@/server/models/Partido/Partido.model";
import { ObjectId, Types } from "mongoose";


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

  static async getLigasDeCiudad(ciudad: string): Promise<LigaDTO[]> {
    await connectDb();

    const ligas = (await Liga?.find({ ciudad: ciudad })) as ILiga[];

    return ligas.map((c) => this.mapToDTO(c));
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

    const estado =
      liga.tipoInscripcion === TipoInscripcion.ABIERTO
        ? EstadoEquipoCompeticion.ACEPTADO
        : EstadoEquipoCompeticion.PENDIENTE;

    // 1. Añadimos el nuevo equipo a la liga
    liga.equipos.push({ id: idEquipo, estado });

    // 2. Generamos los datos base de enfrentamientos (objetos)
    const datosEnfrentamientos = generarEnfrentamientosLigaParaNuevoEquipo(
      liga,
      idEquipo
    );
    // datosEnfrentamientos es un array de IEnfrentamiento, pero sin _id

    // 3. Creamos esos Enfrentamientos en la colección “Enfrentamiento”
    // Cada elemento se convertirá en un doc con su _id
    const docsEnfrentamientos = await Enfrentamiento.insertMany(
      datosEnfrentamientos
    );

    // 4. Obtenemos los _id de cada enfrentamiento creado y los metemos en liga.enfrentamientos
    const idsEnfrentamientos = docsEnfrentamientos.map((doc) => doc._id);
    liga.enfrentamientos.push(...idsEnfrentamientos);

    // 5. Guardamos la liga en DB (ahora solo guarda IDs en “enfrentamientos”)
    await liga.save();

    return this.mapToDTO(liga);
  }

  static async eliminarLiga(idLiga: string, idUser:ObjectId): Promise<EliminarLigaResponse> {
    await connectDb();
    const liga = await Liga?.findById(idLiga);

    if (!liga) {
      throw new Error("No se encontró la liga");
    }

    if(liga.createdByUserId.toString() !== idUser.toString()) {
      throw new Error("No tienes permisos para eliminar esta liga");
    }

    await Liga?.findByIdAndDelete(idLiga);
    await Enfrentamiento?.deleteMany({ competicion: idLiga });
    await Partido?.deleteMany({ competicion: idLiga });

    return { success: true };
  }

  static async getById(id: string): Promise<LigaDTO|null> {
    await connectDb();

    const liga = await Liga?.findOne({ _id: id });

    if (!liga) {
      return null
    }

    return this.mapToDTO(liga);
  }

  static async getEnfrentamientos(idLiga: string): Promise<EnfrentamientoDTO[]> {
    await connectDb();
  
    // 1. Buscar la liga y populamos los enfrentamientos y sus partidos
    const liga = await Liga?.findById(idLiga)
      .populate({
        path: "enfrentamientos",      // array de ObjectIDs
        populate: { path: "partidos" }, // <-- Aquí necesita el modelo "Partido"
      })
      .exec();
  
    if (!liga) {
      // Si no existe la liga, devolvemos array vacío (o lanza error, depende de tu lógica)
      return [];
    }
  
    // 2. liga.enfrentamientos ahora debería ser un array de documentos IEnfrentamiento
    const enfrentamientos = liga.enfrentamientos as unknown as IEnfrentamiento[];
  
    // 3. Convertimos cada IEnfrentamiento en tu EnfrentamientoDTO
    return enfrentamientos.map((enf) => ({
      id: enf.id.toString(),
      competicion: enf.competicion?.toString() ?? "",
      equipoA: enf.equipoA?.toString() ?? "",
      equipoB: enf.equipoB?.toString() ?? "",
      partidos: (enf.partidos as IPartido[]).map((p) => ({
        id: p.id.toString(),
        enfrentamiento: p.enfrentamiento?.toString() ?? "",
        equipoA: p.equipoA?.toString() ?? "",
        equipoB: p.equipoB?.toString() ?? "",
        golesEquipoA: p.golesEquipoA,
        golesEquipoB: p.golesEquipoB,
        finalizado: p.finalizado,
        ganador: p.ganador?.toString() ?? "",
      })),
      ganador: enf.ganador ? enf.ganador.toString() : null,
      jugado: enf.jugado,
    }));
  }

  static mapToDTO(c: ILiga): LigaDTO {
    return {
      id: c._id.toString(),
      nombre: c.nombre,
      tipoCompeticion: TipoCompeticion.LIGA,
      descripcion: c.descripcion,
      googlePlaceId: c.googlePlaceId,
      tipoDeFutbolin: c.tipoDeFutbolin,
      modalidadDeJuego: c.modalidadDeJuego,
      tipoInscripcion: c.tipoInscripcion,
      estadoCompeticion: c.estadoCompeticion,
      cantidadParejas: c.cantidadParejas,
      enfrentamientos: c.enfrentamientos.map((e) => e.toString()),
      ciudad: c.ciudad,
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
): Omit<IEnfrentamiento, "id">[] {

  const esIdaYVuelta = liga.idaYVuelta;

  return liga.equipos
    .filter((eq) => !eq.id.equals(nuevoEquipoId))
    .flatMap((eq) => {
      const ida = {
        competicion: liga._id,
        equipoA: eq.id,
        equipoB: nuevoEquipoId,
        partidos: [],
        ganador: null,
        jugado: false,
      };

      if (esIdaYVuelta) {
        const vuelta = {
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
