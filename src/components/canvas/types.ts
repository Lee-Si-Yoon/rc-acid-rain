export type Coord = { x: number; y: number };

export interface DataProps {
  words: string[];
  failed: string[];
}

export interface CanvasLayerConstructor {
  canvas: HTMLCanvasElement;
}

export interface DataLayerConstructor extends CanvasLayerConstructor {
  initData?: string[];
  words?: string[];
}

export enum CanvasEvents {
  DATA_CHANGE = "dataChange",
  CONTROLLER_EVENT = "controllerEvent",
  TIMER_CHANGE = "timerChange",
}

export enum Phase {
  PLAYING = "playing",
  PAUSED = "paused",
  END = "end",
}

export enum Level {
  EASY = "easy",
  NORMAL = "normal",
  HARD = "hard",
}

export type CanvasDataChangeParams = { data: DataProps };
export type CanvasDataChangeHandler = (params: CanvasDataChangeParams) => void;

export type ControllerProps = {
  isPlaying: Phase;
  level: Level;
  score: number;
};
export type ControllerChangeParams = { data: ControllerProps };
export type ControllerChangeHandler = (params: ControllerChangeParams) => void;

export type TimerProps = {
  playTime: number;
};
export type TimerChangeParams = { data: TimerProps };
export type TimerChangeHandler = (params: TimerChangeParams) => void;
