abstract class BaseLayer {
  protected ctx: CanvasRenderingContext2D;
  protected element: HTMLCanvasElement;
  protected dpr: number = 0;
  protected width: number = 0;
  protected height: number = 0;

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    this.element = canvas;
  }

  getContext() {
    return this.ctx;
  }

  getElement() {
    return this.element;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getDpr() {
    return this.dpr;
  }

  scale(x: number, y: number) {
    this.ctx.scale(x, y);
  }

  setDpr(dpr: number) {
    this.dpr = dpr;
  }

  setWidth(width: number, devicePixelRatio: number) {
    this.width = width;
    this.element.width = devicePixelRatio ? width * devicePixelRatio : width;
    this.element.style.width = `${width}px`;
  }

  setHeight(height: number, devicePixelRatio: number) {
    this.height = height;
    this.element.height = devicePixelRatio ? height * devicePixelRatio : height;
    this.element.style.height = `${height}px`;
  }

  setSize(width: number, height: number, devicePixelRatio: number) {
    this.setWidth(width, devicePixelRatio);
    this.setHeight(height, devicePixelRatio);
    this.dpr = devicePixelRatio ? devicePixelRatio : this.dpr;
  }

  abstract render(): void;
}

export default BaseLayer;
