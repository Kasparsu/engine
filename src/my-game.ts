import { BaseGame } from "./base-game";
import { IRenderer } from "./interfaces";

export class MyGame extends BaseGame {
  update(dt: number): void {
    // example game logic
  }

  draw(r: IRenderer): void {
    r.setDrawColor(0, 128, 255, 255);
    r.clear();
    r.present();
  }
}
