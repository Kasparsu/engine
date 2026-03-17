import { Scene } from "../../Scene";
import type { Game } from "../../Game";
import type { IRenderer } from "../../IRenderer";
import { InputManager } from "../../InputManager";

export class ScreenDrawScene extends Scene {
  constructor(game: Game, input?: InputManager) {
    super(game, input);
  }

  override update(dt: number): void {}

  override draw(r: IRenderer): void {
    const out = r.outputSize?.() ?? { w: 800, h: 600 };
    console.debug("[ScreenDrawScene] renderer methods:", {
      fillRect: typeof r.fillRect,
      fillCircle: typeof r.fillCircle,
      fillRects: typeof r.fillRects,
      renderRaw: !!(r as any).raw,
    });

    // clear
    r.setDrawColor(0, 0, 0, 255);
    r.clear();

    // blue rectangle centered
    const rectW = Math.floor(out.w * 0.4);
    const rectH = Math.floor(out.h * 0.25);
    const rectX = Math.floor((out.w - rectW) / 2);
    const rectY = Math.floor((out.h - rectH) / 3);
    r.setDrawColor(0, 120, 255, 255);
    r.fillRect?.({ x: rectX, y: rectY, w: rectW, h: rectH });

    // red circle on the left
    const cx = Math.floor(out.w * 0.2);
    const cy = Math.floor(out.h * 0.65);
    const radius = Math.floor(Math.min(out.w, out.h) * 0.12);
    r.setDrawColor(220, 24, 24, 255);
    r.fillCircle?.(cx, cy, radius);

    // green filled triangle on the right using scanline fill
    const tx0 = Math.floor(out.w * 0.75);
    const ty0 = Math.floor(out.h * 0.45);
    const tx1 = Math.floor(out.w * 0.9);
    const ty1 = Math.floor(out.h * 0.75);
    const tx2 = Math.floor(out.w * 0.6);
    const ty2 = Math.floor(out.h * 0.75);

    const minY = Math.max(0, Math.min(ty0, ty1, ty2));
    const maxY = Math.min(out.h - 1, Math.max(ty0, ty1, ty2));
    const rects: { x: number; y: number; w: number; h: number }[] = [];
    function edgeX(x0: number, y0: number, x1: number, y1: number, y: number) {
      if (y1 === y0) return x0;
      return x0 + (x1 - x0) * ( (y - y0) / (y1 - y0) );
    }
    for (let y = minY; y <= maxY; y++) {
      const xs: number[] = [];
      if ((y >= ty0 && y <= ty1) || (y >= ty1 && y <= ty0)) xs.push(edgeX(tx0, ty0, tx1, ty1, y));
      if ((y >= ty1 && y <= ty2) || (y >= ty2 && y <= ty1)) xs.push(edgeX(tx1, ty1, tx2, ty2, y));
      if ((y >= ty2 && y <= ty0) || (y >= ty0 && y <= ty2)) xs.push(edgeX(tx2, ty2, tx0, ty0, y));
      if (xs.length < 2) continue;
      xs.sort((a, b) => a - b);
      const x0 = Math.max(0, Math.floor(xs[0]!));
      const x1 = Math.min(out.w - 1, Math.floor(xs[1]!));
      if (x1 >= x0) rects.push({ x: x0, y, w: x1 - x0 + 1, h: 1 });
    }
    if (rects.length > 0) {
      r.setDrawColor(40, 200, 80, 255);
      r.fillRects?.(rects);
    }

    r.present();
  }
}

export default ScreenDrawScene;
