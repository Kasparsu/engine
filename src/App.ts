import { Engine } from "./Engine";
import { Game } from "./Game";
import { SDLWindow } from "./SDLWindow";
import { SDLRenderer } from "./SDLRenderer";
import type { IGame } from "./IGame";
import type { EngineConfig } from "./EngineConfig";

export class App {
  engine: Engine;
  game?: IGame;

  constructor(cfg?: EngineConfig) {
    this.engine = new Engine(cfg);
  }

  async start() {
    await this.engine.run(this.game);
  }

  stop() {
    this.engine.stop();
  }

  createGame() {
    this.game = new Game() as any;
    return this;
  }

  createWindow(title: string, width: number, height: number, flags?: number) {
    this.engine.window = new SDLWindow(title, width, height, flags as any);
    return this;
  }

  createRenderer() {
    this.engine.renderer = new SDLRenderer(this.engine.window.raw);
    return this;
  }
}

export function createApp(cfg?: EngineConfig) {
  return new App(cfg);
}
