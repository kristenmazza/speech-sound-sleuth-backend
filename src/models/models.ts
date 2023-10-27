import mongoose, { Model } from 'mongoose';
import { IHiddenImage } from './hiddenImage';
import { IScene } from './scene';
import { IScore } from './score';

const HiddenImageModel = mongoose.model<IHiddenImage>(
  'HiddenImage'
) as Model<IHiddenImage>;
const SceneModel = mongoose.model<IScene>('Scene') as Model<IScene>;
const ScoreModel = mongoose.model<IScore>('Score') as Model<IScore>;

export {
  HiddenImageModel as HiddenImage,
  SceneModel as Scene,
  ScoreModel as Score,
};
