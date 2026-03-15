import { Scene } from "../Scene";
import { HUDLayer } from "./HUDLayer";
import type { Game } from "../Game";

export class GameplayScene extends Scene {
  constructor(game: Game) {
    super(game);
    this.addLayer(new HUDLayer());
  }

  override async init(): Promise<void> {
    await super.init();
    // initialize gameplay-specific resources
  }

  override update(dt: number): void {
    // gameplay update logic
  }
}
