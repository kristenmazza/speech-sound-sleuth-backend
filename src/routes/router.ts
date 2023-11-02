import { Router } from 'express';
import * as scene from '../controllers/sceneController';
import * as timer from '../controllers/timerController';
export const router: Router = Router();

router.get('/', scene.test);

// Validate user guess
router.get('/image/:hiddenImageId', scene.validate_user_guess);

// Start timer
router.get('/start-timer', timer.start_timer);

// Pause timer
router.get('/pause-timer/:sessionID', timer.pause_timer);

// Resume timer
router.get('/resume-timer/:sessionID', timer.resume_timer);

// Get final time
router.get('/final-time/:sessionID', timer.get_final_time);

// Reset timer
router.get('/reset-timer/:sessionID', timer.reset);

// Disconnect player
router.get('/disconnect-player/:sessionID', timer.player_disconnect);

// Add score for scene
router.post('/:sceneTitle/:sound/scores', scene.add_score);

// Get scores for scene
router.get('/:sceneTitle/:sound/scores', scene.score_list);

// Get scene details
router.get('/:sceneTitle/:sound', scene.scene_details);
