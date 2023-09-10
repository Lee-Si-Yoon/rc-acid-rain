import { MutableRefObject, useCallback } from "react";

import {
  CanvasDataChangeHandler,
  ControllerChangeHandler,
  TimerChangeHandler,
} from "../components/canvas/types";
import { TypingRef } from "../components/typing";

function useHandlers(ref: MutableRefObject<TypingRef | null>) {
  /**
   * @summary CANVAS HANDLERS
   */
  const addCanvasElementEventListener = useCallback(
    (event: string, listener: EventListenerOrEventListenerObject) => {
      ref.current?.addCanvasElementEventListener(event, listener);
    },
    [ref],
  );

  const removeCanvasElementEventListener = useCallback(
    (event: string, listener: EventListenerOrEventListenerObject) => {
      ref.current?.removeCanvasElementEventListener(event, listener);
    },
    [ref],
  );

  /**
   * @summary DATA HANDLERS
   */
  const addDataChangeListener = useCallback(
    (listener: CanvasDataChangeHandler) => {
      ref.current?.addDataChangeListener(listener);
    },
    [ref],
  );

  const removeDataChangeListener = useCallback(
    (listener: CanvasDataChangeHandler) => {
      ref.current?.removeDataChangeListener(listener);
    },
    [ref],
  );

  /**
   * @summary CONTROLLER HANDLERS
   */
  const addControllerChangeListener = useCallback(
    (listener: ControllerChangeHandler) => {
      ref.current?.addControllerChangeListener(listener);
    },
    [ref],
  );

  const removeControllerChangeListener = useCallback(
    (listener: ControllerChangeHandler) => {
      ref.current?.removeControllerChangeListener(listener);
    },
    [ref],
  );

  /**
   * @summary TIMER HANDLER
   */
  const addTimerChangeListener = useCallback(
    (listener: TimerChangeHandler) => {
      ref.current?.addTimerChangeListener(listener);
    },
    [ref],
  );

  const removeTimerChangeListener = useCallback(
    (listener: TimerChangeHandler) => {
      ref.current?.removeTimerChangeListener(listener);
    },
    [ref],
  );

  return {
    addDataChangeListener,
    removeDataChangeListener,
    addCanvasElementEventListener,
    removeCanvasElementEventListener,
    addControllerChangeListener,
    removeControllerChangeListener,
    addTimerChangeListener,
    removeTimerChangeListener,
  };
}

export default useHandlers;
