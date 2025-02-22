// src/models/Futbolin.model.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFutbolin extends Document {
  nombre: string;
  direccion: string;
  googlePlaceId: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

const FutbolinSchema: Schema<IFutbolin> = new Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    googlePlaceId: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
  },
  { timestamps: true }
);

FutbolinSchema.index({ location: '2dsphere' });

const Futbolin: Model<IFutbolin> =
  mongoose.models.Futbolin || mongoose.model<IFutbolin>('Futbolin', FutbolinSchema);

export default Futbolin;
