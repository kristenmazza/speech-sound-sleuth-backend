import { Request, Response } from 'express';

let isTimerRunning = false;
let startTime = 0;
let elapsedTime = 0;

export function start_timer(req: Request, res: Response) {
  try {
    if (!isTimerRunning) {
      isTimerRunning = true;
      startTime = Date.now();
    }

    res.json({ message: 'Timer started' });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function pause_timer(req: Request, res: Response) {
  try {
    if (isTimerRunning) {
      isTimerRunning = false;
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      elapsedTime += elapsed;
    }

    res.json({
      message: `Timer paused`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function resume_timer(req: Request, res: Response) {
  try {
    if (!isTimerRunning) {
      isTimerRunning = true;
      startTime = Date.now();
    }

    res.json({
      message: `Timer resumed`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function get_final_time(req: Request, res: Response) {
  try {
    let finalTime;
    if (isTimerRunning) {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      finalTime = (elapsed + elapsedTime) / 1000;
    } else {
      finalTime = elapsedTime / 1000;
    }
    res.json({ finalTime });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message });
  }
}

export function reset(req: Request, res: Response) {
  isTimerRunning = false;
  startTime = 0;
  elapsedTime = 0;
}
