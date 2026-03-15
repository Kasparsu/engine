import { UILayer } from "../UILayer";
import type { IRenderer } from "../IRenderer";

export class PauseMenuLayer extends UILayer {
  constructor() {
    super("PauseMenu");
    this.visible = false;
  }

  async init(): Promise<void> {
    // load menu assets
  }

  update(dt: number): void {
    // handle menu logic
  }

  draw(r: IRenderer): void {
    // draw pause menu when visible
  }
}
