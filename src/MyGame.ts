import { BaseGame } from "./BaseGame";
import type { IRenderer } from "./IRenderer";

export class MyGame extends BaseGame {
  override update(dt: number): void {
    // example game logic
  }

  override draw(r: IRenderer): void {
    r.setDrawColor(0, 128, 255, 255);
    r.clear();
    r.present();
  }
}
