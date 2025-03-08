import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/shared/enum/Lugares/TipoLugar";
import connectDb from "@/shared/lib/db";
import Spot, { ISpot } from "@/shared/models/Spot/Spot.model";
import { SpotDTO } from "@/shared/models/Spot/SpotDTO"; // Ajusta el path
import { GoogleMapsService } from "@/shared/services/GoogleMaps/GoogleMapsService";
import { ObjectId, Types } from "mongoose";

export class SpotService {
  // Creación
  static async createSpot(spot: Omit<SpotDTO, 'id'|'votes'>): Promise<SpotDTO> {
    await connectDb();

    // Validaciones de dominio:
    const exists = await Spot.findOne({ googlePlaceId: spot.googlePlaceId });
    if (exists) {
      throw new Error("Este spot ya existe en la base de datos");
    }

    // Crear el documento
    const created = await Spot.create({
      nombre: spot.nombre,
      direccion: spot.direccion,
      location: {
        type: "Point",
        coordinates: spot.coordinates,
      },
      googlePlaceId: spot.googlePlaceId,
      tipoLugar: spot.tipoLugar,
      tipoFutbolin: spot.tipoFutbolin,
      verificado: spot.verificado,
    });

    return this.mapToDTO(created);
  }

  // Votar y verificar
  static async votarSpot(
    idSpot: string,
    vote: "up" | "down",
    idUser: ObjectId
  ): Promise<SpotDTO> {
    await connectDb();
    const spot = await Spot.findById(idSpot);

    if (!spot) {
      throw new Error("Spot no encontrado");
    }

    spot.verificado = {
      correcto: vote === "up" ? true : false,
      idUser: idUser,
      fechaVerificacion: new Date(),
    };

    await spot.save();
    return this.mapToDTO(spot);
  }

  static async verificarSpot(
    idSpot: string,
    vote: "up" | "down",
    idUser: Types.ObjectId
  ): Promise<SpotDTO> {
    await connectDb();
    const spot = await Spot.findById(idSpot);

    if (!spot) {
      throw new Error("Spot no encontrado");
    }

    const hasVotedUp = spot.votes.up.some((uid) => uid.equals(idUser));
    const hasVotedDown = spot.votes.down.some((uid) => uid.equals(idUser));

    if (hasVotedUp || hasVotedDown) {
      throw new Error("Ya has votado este spot");
    }

    if (vote === "up") {
      spot.votes.up.push(idUser);
    } else {
      spot.votes.down.push(idUser);
    }

    const updated = await spot.save();
    return this.mapToDTO(updated);
  }

  // Obtención

  static async findNearbyByPlaceId(placeId: string): Promise<SpotDTO[]> {
    await connectDb();

    const coordinates = await GoogleMapsService.getCoordinatesFromPlaceId(
      placeId
    );
    const searchRadiusMeters = 10000; // 10km

    const lugares = await Spot.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [coordinates.lng, coordinates.lat],
          },
          $maxDistance: searchRadiusMeters,
        },
      },
    }).lean<ISpot[]>();

    return lugares.map((lugar) => this.mapToDTO(lugar));
  }

  static mapToDTO(lugar: ISpot): SpotDTO {
    return {
      id: lugar._id.toString(),
      nombre: lugar.nombre,
      direccion: lugar.direccion,
      googlePlaceId: lugar.googlePlaceId,
      coordinates: [...lugar.location.coordinates],
      tipoLugar: lugar.tipoLugar as TipoLugar,
      tipoFutbolin: lugar.tipoFutbolin as TipoFutbolin,
      comentarios: lugar.comentarios,
      verificado: lugar.verificado
        ? {
            idUser: String(lugar.verificado?.idUser),
            fechaVerificacion: lugar.verificado?.fechaVerificacion,
          }
        : null,
      votes: {
        up: lugar.votes.up.map((vote) => vote.toString()),
        down: lugar.votes.down.map((vote) => vote.toString()),
      },
    };
  }
}
