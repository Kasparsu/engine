import { Engine } from "./engine";
import { Game } from "./game";
import { Renderer } from "./renderer";
import { Window } from "./window";
export class App {
  engine: Engine;
  game?: Game;

  constructor(title?: string, width?: number, height?: number, flags?: number, game?: Game) {
    this.engine = new Engine(title, width, height, flags as any);
    this.game = game;
  }

  async start() {
    await this.engine.run(this.game);
  }

  stop() {
    this.engine.stop();
  }

  createGame() {
    this.game = game;
  }
  createWindow(title: string, width: number, height: number, flags?: number) {
    this.engine.window = new Window(title, width, height, flags as any);
    return this;
  }
  createRenderer() {
    this.engine.renderer = new Renderer(this.engine.window.raw);
    return this;
  }
}

export function createApp() {
    return new App();
}