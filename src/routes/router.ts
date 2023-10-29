import { Router } from 'express';
import * as scene from '../controllers/sceneController';
import * as timer from '../controllers/timerController';
export const router: Router = Router();

router.get('/', scene.test);

// Validate user guess
router.get('/image/:hiddenImageId', scene.validate_user_guess);

// Get scene details
router.get('/:sceneTitle/:sound', scene.scene_details);

// Start timer
router.get('/start-timer', timer.start_timer);

// Pause timer
router.get('/pause-timer', timer.pause_timer);

// Resume timer
router.get('/resume-timer', timer.resume_timer);

// Get final time
router.get('/final-time', timer.get_final_time);

// Reset timer
router.get('/reset-timer', timer.reset);

// Add score for scene
router.post('/:sceneTitle/:sound/scores', scene.add_score);

// Get scores for scene
router.get('/:sceneTitle/:sound/scores', scene.score_list);