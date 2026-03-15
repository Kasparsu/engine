import { UILayer } from "./UILayer";
import type { IRenderer } from "./IRenderer";
import type { Game } from "./Game";
import type { InputManager } from "./InputManager";

export abstract class Scene {
  layers: UILayer[] = [];
  input?: InputManager;

  constructor(public game: Game, input?: InputManager) {
    this.input = input;
    console.debug(`[Scene] created ${this.constructor.name}`);
  }

  addLayer(layer: UILayer) {
    this.layers.push(layer);
  }

  removeLayer(layer: UILayer) {
    this.layers = this.layers.filter((l) => l !== layer);
  }

  async init(): Promise<void> {
    console.debug(`[Scene] init ${this.constructor.name}`);
    // scenes can override; default initializes layers
    for (const layer of this.layers) {
      // provide input manager to layers
      if (this.input) layer.input = this.input;
      if ((layer as any).constructor?.name) console.debug(`[Scene] init layer ${(layer as any).constructor.name}`);
      await layer.init();
    }
  }

  abstract update(dt: number): void;

  draw(r: IRenderer): void {
    for (const layer of this.layers) {
      if (layer.visible) layer.draw(r);
    }
  }
}
