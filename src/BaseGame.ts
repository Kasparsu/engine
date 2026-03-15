import { IGame, IRenderer } from "./IGame";

export class BaseGame implements IGame {
  async init(): Promise<void> {
    // no-op by default
  }

  update(dt: number): void {
    // no-op by default
  }

  draw(r: IRenderer): void {
    // no-op by default
  }
}
