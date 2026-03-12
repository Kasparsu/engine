import { Renderer } from "./renderer";

export type InitFn = () => void | Promise<void>;
export type UpdateFn = (dt: number) => void;
export type DrawFn = (renderer: Renderer) => void;

export class Game {
  private initFn?: InitFn;
  private updateFn?: UpdateFn;
  private drawFn?: DrawFn;

  constructor(init?: InitFn, update?: UpdateFn, draw?: DrawFn) {
    this.initFn = init;
    this.updateFn = update;
    this.drawFn = draw;
  }

  async init(): Promise<void> {
    if (this.initFn) await this.initFn();
  }

  update(dt: number): void {
    if (this.updateFn) this.updateFn(dt);
  }

  draw(renderer: Renderer): void {
    if (this.drawFn) this.drawFn(renderer);
  }

  setInit(fn: InitFn) {
    this.initFn = fn;
  }

  setUpdate(fn: UpdateFn) {
    this.updateFn = fn;
  }

  setDraw(fn: DrawFn) {
    this.drawFn = fn;
  }
}
