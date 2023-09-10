import { MutableRefObject, useCallback, useEffect, useState } from "react";

import useHandlers from "./use-handlers";
import { CanvasDataChangeHandler, DataProps } from "../components/canvas/types";
import { TextProps } from "../components/text/text";
import { TypingRef } from "../components/typing";

function useData(ref: MutableRefObject<TypingRef | null>) {
  const { addDataChangeListener, removeDataChangeListener } = useHandlers(ref);
  const [data, setData] = useState<DataProps>({
    words: [],
    failed: [],
  });

  useEffect(() => {
    const listener: CanvasDataChangeHandler = ({ data: canvasData }) => {
      setData(canvasData);
    };

    addDataChangeListener(listener);

    return () => {
      removeDataChangeListener(listener);
    };
  }, [addDataChangeListener, removeDataChangeListener]);

  const removeWord = useCallback(
    (word: string) => {
      if (!ref || ref.current === null) return;
      ref.current.removeWord(word);
    },
    [ref],
  );

  const addWord = useCallback(
    (textProps: Omit<TextProps, "ctx">) => {
      if (!ref || ref.current === null) return;
      ref.current.addWord(textProps);
    },
    [ref],
  );

  return { data, removeWord, addWord };
}

export default useData;
