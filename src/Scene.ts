import { UILayer } from "./UILayer";
import type { IRenderer } from "./IRenderer";
import type { Game } from "./Game";

export abstract class Scene {
  layers: UILayer[] = [];

  constructor(public game: Game) {}

  addLayer(layer: UILayer) {
    this.layers.push(layer);
  }

  removeLayer(layer: UILayer) {
    this.layers = this.layers.filter((l) => l !== layer);
  }

  async init(): Promise<void> {
    // scenes can override; default initializes layers
    for (const layer of this.layers) await layer.init();
  }

  abstract update(dt: number): void;

  draw(r: IRenderer): void {
    for (const layer of this.layers) {
      if (layer.visible) layer.draw(r);
    }
  }
}
