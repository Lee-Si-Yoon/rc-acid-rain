import { DataLayerConstructor, DataProps, Level } from "./types";
import BaseLayer from "../../utils/base-layer";
import { getRandomArbitrary } from "../../utils/math";
import Text, { TextProps, TextState } from "../text/text";

class RenderLayer extends BaseLayer {
  private initData: string[] = [];
  private texts: Text[] = [];
  private data: DataProps = { words: [], failed: [] };

  private level: Level = Level.EASY;

  private maxIndex = 500; // max index for brute force

  constructor({ canvas, initData }: DataLayerConstructor) {
    super({ canvas });

    if (initData) {
      this.initData = initData;
      this.data = { words: initData, failed: [] };
    }
  }

  getTexts() {
    return this.texts;
  }

  setTexts(texts: Text[]) {
    this.texts = texts;
  }

  setLevel(level: Level) {
    this.level = level;
  }

  resetAll(): void {
    this.texts = [];
    this.data.words = this.initData;
    this.data.failed = [];
  }

  initialize(): void {
    this.resetAll();
    this.data.words.forEach(word =>
      this.addWord({
        data: word,
      }),
    );
  }

  getCopiedData(): DataProps {
    const data: DataProps = JSON.parse(JSON.stringify(this.data));
    return data;
  }

  addWord(textProps: Omit<TextProps, "ctx">): void {
    const { data: word, ...rest } = textProps;
    if (!word) throw new Error("invalid word");
    if (this.data.words.includes(word) || this.data.failed.includes(word))
      return;

    const self = new Text({ data: word, ctx: this.ctx, ...rest });

    const { width } = self.getDimension();

    self.setPosition({
      x: getRandomArbitrary(0, this.width - width),
      y: getRandomArbitrary(-(this.height / 4), this.height / 4),
    });

    let textIndex = 0;

    while (textIndex < this.texts.length || textIndex < this.maxIndex) {
      if (this.level === Level.EASY) {
        self.setVelocity({ x: 0, y: getRandomArbitrary(0.5, 1) });
      } else if (this.level === Level.NORMAL) {
        self.setVelocity({
          x: getRandomArbitrary(-0.25, 0.25),
          y: getRandomArbitrary(0.75, 1),
        });
      } else if (this.level === Level.HARD) {
        self.setVelocity({
          x: getRandomArbitrary(-0.5, 0.5),
          y: getRandomArbitrary(1, 1.25),
        });
      }

      let overLapped = false;
      this.texts.forEach(text => {
        const { x } = text.getPosition();
        if (
          (text !== self && self.getIsCollided(text)) ||
          x < 0 ||
          x + width > this.width
        ) {
          overLapped = true;
          self.setPosition({
            x: getRandomArbitrary(0, this.width - width),
            y: getRandomArbitrary(-(this.height / 4), this.height / 4),
          });
        }
      });
      if (overLapped) break;

      textIndex += 1;
    }

    this.data.words = [word, ...this.data.words];
    this.texts.push(self);
  }

  validateWord(word: string): boolean {
    // data.word can exist without being rendered
    return (
      this.data.words.includes(word) &&
      this.texts.map(text => text.textData()).includes(word)
    );
  }

  moveWordToFailed(word: string): void {
    const indexOfWords = this.data.words.indexOf(word);
    this.data.words.splice(indexOfWords, 1);
    this.data.failed.push(word);
  }

  removeViaInput(word: string): void {
    const indexOfWords = this.data.words.indexOf(word);
    if (indexOfWords >= 0) {
      this.data.words.splice(indexOfWords, 1);
    }
    // update text state to particled
    const stringArrayOfTexts: string[] = this.texts.map(text =>
      text.textData(),
    );
    const indexOfParamText = stringArrayOfTexts.indexOf(word);
    if (indexOfParamText >= 0) {
      this.texts[indexOfParamText].setIsAlive(TextState.PARTICLED);
    }
  }

  update(): void {
    for (const text of this.texts) {
      const { x, y } = text.getPosition();
      const { width } = text.getDimension();
      const { x: velX, y: velY } = text.getVelocity();

      if (x + width > this.width) {
        text.setPosition({ x: x - 1, y });
        text.setVelocity({ x: velX * -1, y: velY });
      } else if (x < 0) {
        text.setPosition({ x: x + 1, y });
        text.setVelocity({ x: velX * -1, y: velY });
      }

      // collision
      // if (this._level === Level.HARD) {
      const exceptSelf = this.texts.filter(other => other !== text);

      exceptSelf.forEach(other => {
        if (!text.getIsCollided(other)) return;
        const { x: otherPositionX, y: otherPositionY } = other.getPosition();
        const isSelfOnTop = y < otherPositionY;
        const isSelfOnRight = x > otherPositionX;
        const newPosition = { nx: x, ny: y };

        if (isSelfOnRight) {
          newPosition.nx = x + 1;
        } else {
          newPosition.nx = x - 1;
        }
        if (isSelfOnTop) {
          newPosition.ny = y - 1;
        } else {
          newPosition.ny = y + 1;
        }

        text.setPosition({ x: newPosition.nx, y: newPosition.ny });
        text.setCollideVelocity({
          x: text.getVelocityAfterCollision(other).x * 1,
          y: text.getVelocityAfterCollision(other).y * 1,
        });
      });
      // }

      text.update();
    }
  }

  render(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.font =
      "bold 18px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif";

    ctx.save();

    for (const text of this.texts) {
      ctx.fillStyle = "black";
      if (text.getSpecial() >= 2) ctx.fillStyle = "#C90500";

      text.render();
      text.renderParticles();
    }

    ctx.restore();
  }
}

export default RenderLayer;
