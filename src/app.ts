import { Engine } from "./engine";
import { IGame, EngineConfig } from "./interfaces";

export class App {
  engine: Engine;

  constructor(cfg?: EngineConfig) {
    this.engine = new Engine(cfg);
  }

  async run(game?: IGame) {
    await this.engine.run(game);
  }

  stop() {
    this.engine.stop();
  }
}

export function createApp(cfg: EngineConfig) {
  return new App(cfg);
}