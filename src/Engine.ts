import SDL from "bun-sdl3/src/SDL";
import type { IWindow } from "./IWindow";
import type { IRenderer } from "./IRenderer";
import type { IGame } from "./IGame";
import type { EngineConfig } from "./EngineConfig";
import { SDLWindow } from "./SDLWindow";
import { SDLRenderer } from "./SDLRenderer";
import { InputManager } from "./InputManager";

export class Engine {
  window: IWindow;
  renderer: IRenderer;
  input: InputManager;
  private running = false;

  constructor(cfg: EngineConfig | undefined = undefined, windowImpl?: IWindow, rendererImpl?: IRenderer) {
    const title = cfg?.title ?? "Hello World";
    const width = cfg?.width ?? 800;
    const height = cfg?.height ?? 600;

    SDL.init(SDL.INIT.VIDEO);

    this.window = windowImpl ?? new SDLWindow(title, width, height);
    this.renderer = rendererImpl ?? new SDLRenderer(this.window.raw);
    this.input = new InputManager();
    console.debug(`[Engine] created title=${title} size=${width}x${height}`);
  }

  async run(game?: IGame): Promise<void> {
    this.running = true;
    console.debug("[Engine] run started");

    if (game) await game.init();

    let last = (globalThis as any).performance?.now ? (globalThis as any).performance.now() : Date.now();

    while (this.running) {
      const event = SDL.Events.poll();
      if (event) {
        // forward raw SDL event to input manager for best-effort mapping
        try {
          this.input.handleRawSDL(event);
        } catch {}
        if (event.type === SDL.Events.QUIT) this.running = false;
      }

      const now = (globalThis as any).performance?.now ? (globalThis as any).performance.now() : Date.now();
      const dt = (now - last) / 1000;
      last = now;

      if (game) {
        // ensure active scene receives input manager
        try {
          // @ts-ignore
          if (game.activeScene && (game.activeScene as any).input === undefined) {
            // @ts-ignore
            (game.activeScene as any).input = this.input;
          }
        } catch {}

        game.update(dt);
        game.draw(this.renderer);
      } else {
        this.renderer.setDrawColor(255, 0, 0, 255);
        this.renderer.clear();
        this.renderer.present();
      }
      // yield to the JS event loop so the runtime can process window events and
      // allow the window to appear on platforms where a tight sync loop blocks UI.
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  stop(): void {
    this.running = false;
  }
}
