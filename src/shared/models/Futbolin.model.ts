// src/models/Futbolin.model.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFutbolin extends Document {
  name: string;
  address: string;
  googlePlaceId: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

const FutbolinSchema: Schema<IFutbolin> = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
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
