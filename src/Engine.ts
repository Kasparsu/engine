import SDL from "bun-sdl3/src/SDL";
import type { IWindow } from "./IWindow";
import type { IRenderer } from "./IRenderer";
import type { IGame } from "./IGame";
import type { EngineConfig } from "./EngineConfig";
import { SDLWindow } from "./SDLWindow";
import { SDLRenderer } from "./SDLRenderer";

export class Engine {
  window: IWindow;
  renderer: IRenderer;
  private running = false;

  constructor(cfg: EngineConfig | undefined = undefined, windowImpl?: IWindow, rendererImpl?: IRenderer) {
    const title = cfg?.title ?? "Hello World";
    const width = cfg?.width ?? 800;
    const height = cfg?.height ?? 600;

    SDL.init(SDL.INIT.VIDEO);

    this.window = windowImpl ?? new SDLWindow(title, width, height);
    this.renderer = rendererImpl ?? new SDLRenderer(this.window.raw);
  }

  async run(game?: IGame): Promise<void> {
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
        this.renderer.setDrawColor(255, 0, 0, 255);
        this.renderer.clear();
        this.renderer.present();
      }
    }
  }

  stop(): void {
    this.running = false;
  }
}
