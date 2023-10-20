import { Request, Response } from 'express';
import { HiddenImage } from '../models/hiddenImage';
import asyncHandler from 'express-async-handler';
import { Scene } from '../models/scene';

export function test(req: Request, res: Response) {
  res.send('hi :)');
}

export const validate_user_guess = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const hiddenImageId = req.params.hiddenImageId;
    const x = parseInt(req.query.x as string);
    const y = parseInt(req.query.y as string);

    try {
      const hiddenImage = await HiddenImage.findOne({
        _id: hiddenImageId,
      });

      if (!hiddenImage) {
        res.status(404).json({ message: 'Hidden image not found' });
      } else {
        if (
          x >= hiddenImage.minX &&
          x <= hiddenImage.maxX &&
          y >= hiddenImage.minY &&
          y <= hiddenImage.maxY
        ) {
          res.json({ message: 'Correct' });
        } else {
          res.json({ message: 'Incorrect' });
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ message });
    }
  }
);

export const scene_details = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const sceneTitle = req.params.sceneTitle;
    const sound = req.params.sound;

    try {
      const scene = await Scene.findOne({
        title: sceneTitle,
        sound: sound,
      }).populate('hiddenImages');

      if (!sceneTitle) {
        res.status(404).json({ message: 'Scene not found' });
      } else {
        res.send(scene);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ message });
    }
  }
);
