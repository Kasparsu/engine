import { UILayer } from "../UILayer";
import type { IRenderer } from "../IRenderer";

export class PauseMenuLayer extends UILayer {
  constructor() {
    super("PauseMenu");
    this.visible = false;
    console.debug("[PauseMenuLayer] created");
  }

  async init(): Promise<void> {
    console.debug("[PauseMenuLayer] init");
    // load menu assets
  }

  update(dt: number): void {
    // handle menu logic
  }

  draw(r: IRenderer): void {
    // draw pause menu when visible
  }
}
