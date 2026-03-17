import { BaseGame } from "../../BaseGame";
import type { IRenderer } from "../../IRenderer";

export class BasicBlackGame extends BaseGame {
  constructor() {
    super();
    console.debug("[BasicBlackGame] created");
  }

  override update(dt: number): void {
    // no-op for this simple example
  }

  override draw(r: IRenderer): void {
    // draw a black screen
    r.setDrawColor(0, 0, 0, 255);
    r.clear();
    r.present();
  }
}
