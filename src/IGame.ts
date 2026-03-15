import type { IRenderer } from "./IRenderer";

export interface IGame {
  init(): Promise<void>;
  update(dt: number): void;
  draw(r: IRenderer): void;
}
