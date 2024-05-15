import { useRafInterval } from "ahooks";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { DigitPanel } from "../DigitPanel";

export type TimerRef = {
  start: () => void;
  stop: () => number;
  reset: () => void;
};

type TimerProps = {
  start?: number;
  interval: number;
};

export const Timer = forwardRef<TimerRef, TimerProps>(
  ({ start = 0, interval }, ref) => {
    const [count, setCount] = useState(start);
    const [_interval, setInterval] = useState<number>();
    const timeRef = useRef<{
      startStamp: number;
      time: number;
    }>({ startStamp: 0, time: 0 });
    useImperativeHandle(ref, () => ({
      start() {
        setInterval(interval);
        timeRef.current.startStamp = Date.now();
      },
      stop() {
        setInterval(undefined);
        const time = Date.now() - timeRef.current.startStamp;
        timeRef.current.time += time;
        return timeRef.current.time;
      },
      reset() {
        setInterval(undefined);
        setCount(start);
        timeRef.current.time = 0;
      },
    }));
    useRafInterval(() => {
      setCount((count) => count + 1);
    }, _interval);

    return <DigitPanel value={count} />;
  }
);
