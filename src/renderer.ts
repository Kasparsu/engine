import SDL from "bun-sdl3/src/SDL";
import { IRenderer, SDLRendererHandle } from "./interfaces";

export class SDLRenderer implements IRenderer {
  instance: SDLRendererHandle;
  constructor(windowInstance: any) {
    this.instance = SDL.Renderer.create(windowInstance);
  }

  get raw() {
    return this.instance;
  }

  setDrawColor(r: number, g: number, b: number, a: number) {
    SDL.Renderer.setDrawColor(this.instance, r, g, b, a);
  }

  clear() {
    SDL.Renderer.clear(this.instance);
  }

  present() {
    SDL.Renderer.present(this.instance);
  }
}
