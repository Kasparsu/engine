import { Scene } from "../../Scene";
import type { Game } from "../../Game";
import type { IRenderer } from "../../IRenderer";
import { InputManager } from "../../InputManager";

export class HelloWorldScene extends Scene {
  constructor(game: Game, input?: InputManager) {
    super(game, input);
  }

  override update(dt: number): void {}

  override draw(r: IRenderer): void {
    const out = r.outputSize?.() ?? { w: 800, h: 600 };
    r.setDrawColor(20, 20, 20, 255);
    r.clear();

    // Draw simple text via debug texture path if available, else draw a rectangle and rely on console
    r.setDrawColor(0, 130, 200, 255);
    r.fillRect?.({ x: Math.floor(out.w / 2 - 150), y: Math.floor(out.h / 2 - 40), w: 300, h: 80 });

    r.setDrawColor(255, 255, 255, 255);
      // Use renderer helper if available (safe, opt-in for FFI)
          r.renderDebugText?.("Hello World", Math.floor(out.w / 2 - 60), Math.floor(out.h / 2 - 8));
      try {
      
      } catch (e) {
        // ignore
      }

    r.present();
  }
}

export default HelloWorldScene;
