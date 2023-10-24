import { Request, Response } from 'express';

let isTimerRunning = false;
let startTime = BigInt(0);
let elapsedTime = BigInt(0);

export function start_timer(req: Request, res: Response) {
  if (!isTimerRunning) {
    isTimerRunning = true;
    startTime = process.hrtime.bigint();
  }

  res.json({ message: 'Timer started' });
}

export function pause_timer(req: Request, res: Response) {
  if (isTimerRunning) {
    isTimerRunning = false;
    const elapsed = process.hrtime.bigint() - startTime;
    elapsedTime += elapsed / BigInt(1000000);
  }

  res.json({
    message: `Timer paused with elapsed time: ${
      elapsedTime / BigInt(1000)
    } seconds`,
  });
}

export function resume_timer(req: Request, res: Response) {
  if (!isTimerRunning) {
    isTimerRunning = true;
    startTime = process.hrtime.bigint();
  }

  res.json({
    message: `Timer resumed`,
  });
}

export function get_final_time(req: Request, res: Response) {
  let finalTime;
  if (isTimerRunning) {
    const elapsed = process.hrtime.bigint() - startTime;
    finalTime = elapsedTime + elapsed / BigInt(1000);
  } else {
    finalTime = elapsedTime / BigInt(1000);
  }

  res.json({ finalTime });
}

export function reset(req: Request, res: Response) {
  isTimerRunning = false;
  startTime = BigInt(0);
  elapsedTime = BigInt(0);
}
