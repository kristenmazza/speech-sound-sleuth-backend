import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

const activeSessions = new Set();
const playerTimers = new Map();

type playerTimerType = {
  sessionID: string;
  isRunning: boolean;
  startTime: number;
  elapsedTime: number;
};

function generateUniqueSessionID() {
  let sessionID;

  do {
    sessionID = uuid();
  } while (activeSessions.has(sessionID));

  activeSessions.add(sessionID);
  return sessionID;
}

function createPlayerTimer(sessionIdentifier: string) {
  const playerTimer = {
    sessionID: sessionIdentifier,
    isRunning: false,
    startTime: 0,
    elapsedTime: 0,
  };

  playerTimers.set(sessionIdentifier, playerTimer);
  return playerTimer;
}

function startPlayerTimer(playerTimer: playerTimerType) {
  playerTimer.isRunning = true;
  playerTimer.startTime = Date.now();
}

function pausePlayerTimer(playerTimer: playerTimerType) {
  if (playerTimer.isRunning) {
    playerTimer.isRunning = false;
    const currentTime = Date.now();
    const elapsed = currentTime - playerTimer.startTime;
    playerTimer.elapsedTime += elapsed;
  }
}

function resumePlayerTimer(playerTimer: playerTimerType) {
  if (!playerTimer.isRunning) {
    playerTimer.isRunning = true;
    playerTimer.startTime = Date.now();
  }
}

function getFinalPlayerTime(playerTimer: playerTimerType) {
  if (playerTimer.isRunning) {
    const currentTime = Date.now();
    const elapsed = currentTime - playerTimer.startTime;
    return (playerTimer.elapsedTime + elapsed) / 1000;
  } else {
    return playerTimer.elapsedTime / 1000;
  }
}

function resetPlayerTimer(playerTimer: playerTimerType) {
  playerTimer.isRunning = false;
  playerTimer.startTime = 0;
  playerTimer.elapsedTime = 0;
}

function removeSession(sessionIdentifier: string) {
  activeSessions.delete(sessionIdentifier);
  playerTimers.delete(sessionIdentifier);
}

export function start_timer(req: Request, res: Response) {
  try {
    const sessionIdentifier = generateUniqueSessionID();
    const playerTimer = createPlayerTimer(sessionIdentifier);
    startPlayerTimer(playerTimer);
    res.json({ message: 'Timer started', sessionID: sessionIdentifier });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function pause_timer(req: Request, res: Response) {
  try {
    const sessionIdentifier = req.params.sessionID;
    if (activeSessions.has(sessionIdentifier)) {
      const playerTimer = playerTimers.get(sessionIdentifier);

      if (playerTimer) {
        pausePlayerTimer(playerTimer);
        res.json({
          message: `Timer paused`,
        });
      } else {
        res.status(404).json({ message: 'Player timer not found' });
      }
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function resume_timer(req: Request, res: Response) {
  try {
    const sessionIdentifier = req.params.sessionID;

    if (activeSessions.has(sessionIdentifier)) {
      const playerTimer = playerTimers.get(sessionIdentifier);

      if (playerTimer) {
        resumePlayerTimer(playerTimer);
        res.json({
          message: `Timer resumed`,
        });
      } else {
        res.status(404).json({ message: 'Player timer not found' });
      }
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function get_final_time(req: Request, res: Response) {
  try {
    const sessionIdentifier = req.params.sessionID;
    if (activeSessions.has(sessionIdentifier)) {
      const playerTimer = playerTimers.get(sessionIdentifier);

      if (playerTimer) {
        const finalTime = getFinalPlayerTime(playerTimer);
        res.json({ finalTime });
      } else {
        res.status(404).json({ message: 'Player timer not found' });
      }
    } else {
      res.status(404).json({ message: 'Session nto found' });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function reset(req: Request, res: Response) {
  try {
    const sessionIdentifier = req.params.sessionID;

    if (activeSessions.has(sessionIdentifier)) {
      const playerTimer = playerTimers.get(sessionIdentifier);

      if (playerTimer) {
        resetPlayerTimer(playerTimer);
        res.json({ message: 'Timer reset' });
      } else {
        res.status(404).json({ message: 'Player timer not found' });
      }
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function player_disconnect(req: Request, res: Response) {
  try {
    const sessionIdentifier = req.params.sessionID;
    if (activeSessions.has(sessionIdentifier)) {
      removeSession(sessionIdentifier);
      res.json({ message: 'Player disconnected' });
    } else {
      res.status(404).json({ message: 'Session not found ' });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}
