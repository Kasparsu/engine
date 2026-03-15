import { UILayer } from "../UILayer";
import type { IRenderer } from "../IRenderer";

export class HUDLayer extends UILayer {
  constructor() {
    super("HUD");
  }

  async init(): Promise<void> {
    // initialize HUD resources
  }

  update(dt: number): void {
    // update HUD state
  }

  draw(r: IRenderer): void {
    // simple placeholder drawing (consumers should implement)
  }
}
