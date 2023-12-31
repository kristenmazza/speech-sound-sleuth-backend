import { Schema, model, Types } from 'mongoose';

interface IScene {
  title: string;
  sound: string;
  imageUrl: string;
  hiddenImages: Types.ObjectId[];
  imageCreditName?: string;
  imageCreditLink?: string;
}

const sceneSchema = new Schema<IScene>({
  title: { type: String, required: true },
  sound: { type: String, required: true },
  imageUrl: { type: String, required: true },
  hiddenImages: [{ type: Schema.Types.ObjectId, ref: 'HiddenImage' }],
  imageCreditName: { type: String },
  imageCreditLink: { type: String },
});

export const Scene = model<IScene>('Scene', sceneSchema);
