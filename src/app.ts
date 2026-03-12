import { Engine } from "./engine";
import { Game } from "./game";

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

  setGame(game: Game) {
    this.game = game;
  }
}
