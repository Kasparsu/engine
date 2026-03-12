import SDL from "bun-sdl3/src/SDL";
import { Window } from "./window";
import { Renderer } from "./renderer";

export class Engine {
  window: Window;
  renderer: Renderer;
  private running = false;

  constructor(
    title = "Hello World",
    width = 800,
    height = 600,
    flags = SDL.Window.WINDOW.RESIZABLE
  ) {
    SDL.init(SDL.INIT.VIDEO);
    this.window = new Window(title, width, height, flags);
    this.renderer = new Renderer(this.window.raw);
  }

  run(): void {
    this.running = true;
    while (this.running) {
      const event = SDL.Events.poll();
      if (event) {
        if (event.type === SDL.Events.QUIT) this.running = false;
      }

      this.renderer.setDrawColor(255, 0, 0, 255);
      this.renderer.clear();
      this.renderer.present();
    }
  }

  stop(): void {
    this.running = false;
  }
}
