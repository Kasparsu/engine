import { Scene } from "../Scene";
import { HUDLayer } from "./HUDLayer";
import { PauseMenuLayer } from "./PauseMenuLayer";
import type { Game } from "../Game";

export class MenuScene extends Scene {
  constructor(game: Game) {
    super(game);
    this.addLayer(new HUDLayer());
    this.addLayer(new PauseMenuLayer());
  }

  update(dt: number): void {
    // menu logic
  }
}
