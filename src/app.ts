import { Engine } from "./engine";

export class App {
  engine: Engine;
  constructor(title?: string, width?: number, height?: number, flags?: number) {
    this.engine = new Engine(title, width, height, flags as any);
  }

  start() {
    this.engine.run();
  }

  stop() {
    this.engine.stop();
  }
}
