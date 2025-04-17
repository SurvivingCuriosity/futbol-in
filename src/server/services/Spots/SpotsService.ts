import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/core/enum/Lugares/TipoLugar";
import connectDb from "@/server/lib/db";
import Spot, { ISpot } from "@/server/models/Spot/Spot.model";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { ObjectId, Types } from "mongoose";
import { ZodError } from "zod";

export class SpotService {

  static async getAll(): Promise<SpotDTO[]> {
    await connectDb();
    const spot = await Spot.find()
    return spot.map((spot) => this.mapToDTO(spot));
  }

  static async deleteSpot(id: string): Promise<void> {
    await connectDb();
    await Spot.findByIdAndDelete(id);
  }

  static async getById(id: string): Promise<SpotDTO> {
    await connectDb();
    const spot = await Spot.findById(id);
    if (!spot) {
      throw new Error("Spot no encontrado");
    }
    return this.mapToDTO(spot);
  }

  static async createSpot(
    spot: Omit<SpotDTO, "id" | "votes">
  ): Promise<SpotDTO> {
    await connectDb();

    // Validaciones de dominio:
    const exists = await Spot.findOne({
      googlePlaceId: spot.googlePlaceId,
      tipoFutbolin: spot.tipoFutbolin,
    });
    if (exists) {
      throw new ZodError([
        {
          message: "Este futbolín ya está agregado",
          path: ["futbolin"],
          code: "custom",
        },
      ]);
    }

    // Crear el documento
    const created = await Spot.create({
      ...spot,
      location: {
        type: "Point",
        coordinates: spot.coordinates,
      },
    });

    return this.mapToDTO(created);
  }

  static async verificarSpot(
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

  static async getSpotsDeOperador(idOperador: string): Promise<SpotDTO[]> {
    await connectDb();
    const spots = await Spot.find({
      idOperador: idOperador,
    }).lean<ISpot[]>();
    return spots.map((spot) => this.mapToDTO(spot));
  }

  static async votarSpot(
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

    spot.votes[vote].push(idUser);

    const updated = await spot.save();
    return this.mapToDTO(updated);
  }

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

  static async findInCiudad(ciudad: string): Promise<SpotDTO[]> {
    await connectDb();

    const lugares = await Spot.find({
      ciudad: ciudad,
    }).lean<ISpot[]>();

    return lugares.map((lugar) => this.mapToDTO(lugar));
  }

  static mapToDTO(lugar: ISpot): SpotDTO {
    return {
      id: lugar._id.toString(),
      nombre: lugar.nombre,
      direccion: lugar.direccion,
      googlePlaceId: lugar.googlePlaceId,
      ciudad: lugar.ciudad,
      coordinates: [...lugar.location.coordinates],
      idOperador: lugar.idOperador?.toString() || null,
      tipoLugar: lugar.tipoLugar as TipoLugar,
      tipoFutbolin: lugar.tipoFutbolin as TipoFutbolin,
      distribucion: lugar.distribucion,
      comentarios: lugar.comentarios,
      addedByUserId: lugar.addedByUserId.toString(),
      verificado: lugar.verificado
        ? {
            correcto: lugar.verificado.correcto,
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
