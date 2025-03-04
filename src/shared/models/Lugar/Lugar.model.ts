import mongoose, { Document, Model, Schema } from 'mongoose';
import { TipoFutbolin } from '../../enum/Futbolin/TipoFutbolin';
import { TipoLugar } from '../../enum/Lugares/TipoLugar';

export interface ILugar extends Document {
  nombre: string;
  direccion: string;
  googlePlaceId: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  tipoLugar: TipoLugar;
  tipoFutbolin: TipoFutbolin;
  comentarios: string;
}

const LugarSchema: Schema<ILugar> = new Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    googlePlaceId: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
    tipoLugar: { type: String, enum: Object.values(TipoLugar), required: true },
    tipoFutbolin: { type: String, enum: Object.values(TipoFutbolin), required: true },
    comentarios: { type: String },
  },
  { timestamps: true }
);

LugarSchema.index({ location: '2dsphere' });

const Lugar: Model<ILugar> =
  mongoose.models.Lugar || mongoose.model<ILugar>('Lugar', LugarSchema);

export default Lugar;
