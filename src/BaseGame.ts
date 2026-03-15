import type { IGame } from "./IGame";
import type { IRenderer } from "./IRenderer";

export class BaseGame implements IGame {
  async init(): Promise<void> {
    console.debug("[BaseGame] init (no-op)");
  }

  update(dt: number): void {
    // no-op by default
  }

  draw(r: IRenderer): void {
    // no-op by default
  }
}
