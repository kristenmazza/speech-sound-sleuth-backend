import { Schema, model, Types } from 'mongoose';

interface IScore {
  nickname: string;
  timeInS: number;
  sound: string;
  scene: Types.ObjectId;
}

const scoreSchema = new Schema<IScore>({
  nickname: { type: String, required: true },
  timeInS: { type: Number, required: true },
  sound: { type: String, required: true },
  scene: { type: Schema.Types.ObjectId, ref: 'Scene' },
});

export const Score = model<IScore>('Score', scoreSchema);
