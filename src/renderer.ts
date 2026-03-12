import SDL from "bun-sdl3/src/SDL";

export class Renderer {
  instance: any;
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
