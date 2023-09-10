import { MutableRefObject, useCallback, useEffect, useState } from "react";

import useHandlers from "./use-handlers";
import {
  ControllerChangeHandler,
  ControllerProps,
  TimerChangeHandler,
  TimerProps,
  Level,
  Phase,
} from "../components/canvas/types";
import { TypingRef } from "../components/typing";

function useController(ref: MutableRefObject<TypingRef | null>) {
  const {
    addControllerChangeListener,
    removeControllerChangeListener,
    addTimerChangeListener,
    removeTimerChangeListener,
  } = useHandlers(ref);
  const [controllerData, setControllerData] = useState<ControllerProps>({
    isPlaying: Phase.END,
    level: Level.EASY,
    score: 0,
  });

  const [timerData, setTimerData] = useState<TimerProps>({
    playTime: 0,
  });

  useEffect(() => {
    const listener: ControllerChangeHandler = ({ data: controllerData }) => {
      setControllerData(controllerData);
    };
    addControllerChangeListener(listener);

    return () => {
      removeControllerChangeListener(listener);
    };
  }, [addControllerChangeListener, removeControllerChangeListener]);

  useEffect(() => {
    const listener: TimerChangeHandler = ({ data: timerData }) => {
      setTimerData(timerData);
    };
    addTimerChangeListener(listener);

    return () => {
      removeTimerChangeListener(listener);
    };
  }, [addTimerChangeListener, removeTimerChangeListener]);

  const setIsPlaying = useCallback(
    (phase: Phase) => {
      if (!ref || ref.current === null) return;
      ref.current.setIsPlaying(phase);
    },
    [ref],
  );

  const setLevel = useCallback(
    (level: Level) => {
      if (!ref || ref.current === null) return;
      ref.current.setLevel(level);
    },
    [ref],
  );

  return {
    timerData,
    controllerData,
    setIsPlaying,
    setLevel,
  };
}

export default useController;
