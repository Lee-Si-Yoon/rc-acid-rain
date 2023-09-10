import React from "react";

import { combinedArray } from "./mock-data";
import { Level, Phase } from "../../src/components/canvas/types";
import Typing, { TypingRef } from "../../src/components/typing";
import { useController, useData } from "../../src/hooks";

const spaceRE = /\s+/g;
const removeAllWhiteSpaces = (word: string) =>
  word && word.replace(spaceRE, "");

const parseMs = (ms: number) => {
  const totalSeconds = Math.floor(ms / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return {
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

enum GamePhase {
  BEFORE_START = "no started yet",
  GAME_PLAYING = "game is running",
  END = "game ended, small amount of stall before navigation",
}

function TypingGame() {
  /** VIEWPORT */
  const [height, setHeight] = React.useState<number>(0);
  React.useEffect(() => {
    const viewportHandler = () => {
      if (window.visualViewport && window.visualViewport.offsetTop >= 0) {
        setHeight(window.visualViewport.height - 40 - 50);
      }
    };
    viewportHandler();

    window.visualViewport?.addEventListener("resize", viewportHandler);
    return () =>
      window.visualViewport?.removeEventListener("resize", viewportHandler);
  }, [window.visualViewport]);

  /** GAME */
  const [gamePhase, setGamePhase] = React.useState<GamePhase>(
    GamePhase.BEFORE_START,
  );
  const ref = React.useRef<TypingRef>(null);
  const { addWord, removeWord, data } = useData(ref);
  const { setIsPlaying, setLevel, controllerData, timerData } =
    useController(ref);

  const [inputValue, setInputValue] = React.useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setInputValue(value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    removeWord(inputValue);
    setInputValue("");
  };

  const [spawnWords, setSpawnWords] = React.useState<boolean>(true);
  const spawnRef = React.useRef<NodeJS.Timer>();

  React.useEffect(() => {
    if (spawnWords && controllerData.isPlaying === Phase.PLAYING) {
      if (combinedArray.length <= 0) return;
      spawnRef.current = setInterval(() => {
        const index = Math.floor(Math.random() * combinedArray.length);
        const word = removeAllWhiteSpaces(combinedArray[index]);
        if (word)
          addWord({ data: word, special: Math.random() * 10 > 7 ? 2 : 1 });
        combinedArray.splice(index, 1);
      }, 2000);
    }
    return () => clearInterval(spawnRef.current);
  }, [spawnWords, controllerData.isPlaying]);

  React.useEffect(() => {
    const onGameEnd = () => {
      setIsPlaying(Phase.END);

      // setTimeout(() => {
      //   navigate(`${Paths.gymboxx.score}?score=${controllerData.score}`);
      // }, 2000);
    };
    const onGameStart = () => {
      setTimeout(() => {
        setIsPlaying(Phase.PLAYING);
      }, 3500);
    };
    if (gamePhase === GamePhase.GAME_PLAYING) onGameStart();
    if (gamePhase === GamePhase.END) onGameEnd();
  }, [gamePhase]);

  const paramMinute = 30;
  const paramSecond = 10;
  const totalTime = (Number(paramMinute) * 60 + Number(paramSecond)) * 100;

  React.useEffect(() => {
    if (totalTime <= timerData.playTime) setGamePhase(GamePhase.END);
  }, [timerData.playTime, totalTime]);

  React.useEffect(() => {
    timerData.playTime / totalTime > 0.5
      ? timerData.playTime / totalTime > 0.75
        ? setLevel(Level.HARD)
        : setLevel(Level.NORMAL)
      : setLevel(Level.EASY);
  }, [timerData.playTime, totalTime]);

  return (
    <div>
      <nav>
        <span>
          {parseMs(totalTime - timerData.playTime).minutes}’
          {parseMs(totalTime - timerData.playTime).seconds}’’
        </span>
        <span>{controllerData.score}점</span>
      </nav>
      <Typing
        ref={ref}
        width={"100%"}
        height={height}
        initData={["엘리코", "오버헤드프레스", "스쿼트", "짐박스"]}
        backgroundComponent={
          <div>
            {gamePhase === GamePhase.BEFORE_START && <span>before start</span>}
            {gamePhase === GamePhase.GAME_PLAYING && <span>playing</span>}
            {gamePhase === GamePhase.END && <span>end</span>}
          </div>
        }
      />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="타자도 손가락 운동이다"
          value={inputValue}
          onChange={onChange}
          onFocus={() => setGamePhase(GamePhase.GAME_PLAYING)}
        />
      </form>
    </div>
  );
}

TypingGame.displayName = "TypingGame";

export default TypingGame;
