import type { IRenderer } from "./IRenderer";
import type { Scene } from "./Scene";

export class Game {
  activeScene?: Scene;

  constructor() {}

  async init(): Promise<void> {
    if (this.activeScene) await this.activeScene.init();
  }

  update(dt: number): void {
    if (this.activeScene) this.activeScene.update(dt);
  }

  draw(r: IRenderer): void {
    if (this.activeScene) this.activeScene.draw(r);
  }

  setScene(s: Scene) {
    this.activeScene = s;
  }
}
