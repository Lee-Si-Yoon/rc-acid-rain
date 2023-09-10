/**
 * @url https://github.com/hyukson/hangul-util/blob/main/src/divide.ts
 */

const HANGUL_START_CHARCODE = "가".charCodeAt(0);
const HANGUL_END_CHARCODE = "힣".charCodeAt(0);
const CHO_PERIOD = "까".charCodeAt(0) - "가".charCodeAt(0);
const JONG_PERIOD = "개".charCodeAt(0) - "가".charCodeAt(0);

const JUNG_COMPLETE_HANGUL: Record<string, string> = {
  ㅘ: "ㅗㅏ",
  ㅙ: "ㅗㅐ",
  ㅚ: "ㅗㅣ",
  ㅝ: "ㅜㅓ",
  ㅞ: "ㅜㅔ",
  ㅟ: "ㅜㅣ",
  ㅢ: "ㅡㅣ",
};

const JONG_COMPLETE_HANGUL: Record<string, string> = {
  ㄳ: "ㄱㅅ",
  ㄵ: "ㄴㅈ",
  ㄶ: "ㄴㅎ",
  ㄺ: "ㄹㄱ",
  ㄻ: "ㄹㅁ",
  ㄼ: "ㄹㅂ",
  ㄽ: "ㄹㅅ",
  ㄾ: "ㄹㅌ",
  ㄿ: "ㄹㅍ",
  ㅀ: "ㄹㅎ",
  ㅄ: "ㅂㅅ",
};

const CHO_HANGUL = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const JUNG_HANGUL = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const JONG_HANGUL = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

function divideByJung(jung: string) {
  return JUNG_COMPLETE_HANGUL[jung] || jung;
}

function divideByJong(jong: string) {
  return JONG_COMPLETE_HANGUL[jong] || jong;
}

const isKORByCode = (code: number): boolean =>
  HANGUL_START_CHARCODE <= code && code <= HANGUL_END_CHARCODE;

function isKOR(word: string) {
  for (let index = 0; index < word.length; index++) {
    if (!isKORByCode(word.charCodeAt(index))) return false;
  }

  return true;
}

function divideSingleKORCharacter(word: string): string[] {
  const wordCode = word.charCodeAt(0);
  const charCode = wordCode - HANGUL_START_CHARCODE;

  if (!isKORByCode(wordCode)) return [word[0]];

  const choIndex = Math.floor(charCode / CHO_PERIOD);
  const jungIndex = Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD);
  const jongIndex = charCode % JONG_PERIOD;

  const cho = CHO_HANGUL[choIndex] || "";
  const jung = JUNG_HANGUL[jungIndex] || "";
  const jong = JONG_HANGUL[jongIndex] || "";

  const dividedJung = divideByJung(jung);
  const dividedJong = divideByJong(jong);

  return (cho + dividedJung + dividedJong).split("");
}

function divideKOR(word: string) {
  const divided = word
    .toString()
    .split("")
    .map((char) => divideSingleKORCharacter(char))
    .join("");

  return divided.split("");
}

export { divideKOR, isKOR };
