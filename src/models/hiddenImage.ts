import { Schema, model } from 'mongoose';

interface IHiddenImage {
  name: string;
  imageUrl: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const hiddenImageSchema = new Schema<IHiddenImage>({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  minX: { type: Number, required: true },
  maxX: { type: Number, required: true },
  minY: { type: Number, required: true },
  maxY: { type: Number, required: true },
});

export const HiddenImage = model<IHiddenImage>(
  'HiddenImage',
  hiddenImageSchema
);
