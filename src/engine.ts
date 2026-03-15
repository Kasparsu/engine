import SDL from "bun-sdl3/src/SDL";
import { Window } from "./window";
import { Renderer } from "./renderer";
import { Game } from "./game";

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

  async run(game?: Game): Promise<void> {
    this.running = true;

    if (game) await game.init();

    let last = (globalThis as any).performance?.now ? (globalThis as any).performance.now() : Date.now();

    while (this.running) {
      const event = SDL.Events.poll();
      if (event) {
        if (event.type === SDL.Events.QUIT) this.running = false;
      }

      const now = (globalThis as any).performance?.now ? (globalThis as any).performance.now() : Date.now();
      const dt = (now - last) / 1000;
      last = now;

      if (game) {
        game.update(dt);
        game.draw(this.renderer);
      } else {
        
      }
    }
  }

  stop(): void {
    this.running = false;
  }
}
