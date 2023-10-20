import { Router } from 'express';
import * as scene from '../controllers/sceneController';
export const router = Router();

router.get('/', scene.test);

// Validate user guess
router.get('/image/:hiddenImageId', scene.validate_user_guess);

// Get scene details
router.get('/:sceneTitle/:sound', scene.scene_details);

// Get scores for scene
// router.get('/:sceneTitle/:sound/scores)
