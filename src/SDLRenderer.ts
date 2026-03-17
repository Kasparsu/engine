import SDL from "bun-sdl3/src/SDL";
import type { IRenderer, SDLRendererHandle } from "./IRenderer";
import { ptr } from "bun:ffi";

export class SDLRenderer implements IRenderer {
  instance: SDLRendererHandle;
  constructor(windowInstance: any) {
    this.instance = SDL.Renderer.create(windowInstance);
    console.debug("[SDLRenderer] created");
  }

  get raw() {
    return this.instance;
  }

  drawPoint(x: number, y: number) {
    const buf = new ArrayBuffer(8);
    new DataView(buf).setFloat32(0, x, true);
    new DataView(buf).setFloat32(4, y, true);
    SDL.Renderer.renderPoints(this.instance, ptr(buf), 1);
  }

  drawPoints(points: { x: number; y: number }[]) {
    const buf = new ArrayBuffer(points.length * 8);
    const dv = new DataView(buf);
    for (let i = 0; i < points.length; i++) {
      dv.setFloat32(i * 8 + 0, points[i]!.x, true);
      dv.setFloat32(i * 8 + 4, points[i]!.y, true);
    }
    SDL.Renderer.renderPoints(this.instance, ptr(buf), points.length);
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    const buf = new ArrayBuffer(16);
    const dv = new DataView(buf);
    dv.setFloat32(0, x1, true);
    dv.setFloat32(4, y1, true);
    dv.setFloat32(8, x2, true);
    dv.setFloat32(12, y2, true);
    // prefer renderLines if available
    if ((SDL.Renderer as any).renderLines) {
      (SDL.Renderer as any).renderLines(this.instance, ptr(buf), 2);
      return;
    }
    // fallback: draw two points (thin line)
    SDL.Renderer.renderPoints(this.instance, ptr(buf), 2);
  }

  drawLines(points: { x: number; y: number }[]) {
    const buf = new ArrayBuffer(points.length * 8);
    const dv = new DataView(buf);
    for (let i = 0; i < points.length; i++) {
      dv.setFloat32(i * 8 + 0, points[i]!.x, true);
      dv.setFloat32(i * 8 + 4, points[i]!.y, true);
    }
    if ((SDL.Renderer as any).renderLines) {
      (SDL.Renderer as any).renderLines(this.instance, ptr(buf), points.length);
      return;
    }
    SDL.Renderer.renderPoints(this.instance, ptr(buf), points.length);
  }

  drawRect(rect: { x: number; y: number; w: number; h: number }) {
    const buf = new ArrayBuffer(16);
    const dv = new DataView(buf);
    dv.setFloat32(0, rect.x, true);
    dv.setFloat32(4, rect.y, true);
    dv.setFloat32(8, rect.w, true);
    dv.setFloat32(12, rect.h, true);
    SDL.Renderer.renderRects(this.instance, ptr(buf), 1);
  }

  fillRect(rect: { x: number; y: number; w: number; h: number }) {
    const buf = new ArrayBuffer(16);
    const dv = new DataView(buf);
    dv.setFloat32(0, rect.x, true);
    dv.setFloat32(4, rect.y, true);
    dv.setFloat32(8, rect.w, true);
    dv.setFloat32(12, rect.h, true);
    SDL.Renderer.renderFillRects(this.instance, ptr(buf), 1);
  }

  drawRects(rects: { x: number; y: number; w: number; h: number }[]) {
    const buf = new ArrayBuffer(rects.length * 16);
    const dv = new DataView(buf);
    for (let i = 0; i < rects.length; i++) {
      dv.setFloat32(i * 16 + 0, rects[i]!.x, true);
      dv.setFloat32(i * 16 + 4, rects[i]!.y, true);
      dv.setFloat32(i * 16 + 8, rects[i]!.w, true);
      dv.setFloat32(i * 16 + 12, rects[i]!.h, true);
    }
    SDL.Renderer.renderRects(this.instance, ptr(buf), rects.length);
  }

  fillRects(rects: { x: number; y: number; w: number; h: number }[]) {
    const buf = new ArrayBuffer(rects.length * 16);
    const dv = new DataView(buf);
    for (let i = 0; i < rects.length; i++) {
      dv.setFloat32(i * 16 + 0, rects[i]!.x, true);
      dv.setFloat32(i * 16 + 4, rects[i]!.y, true);
      dv.setFloat32(i * 16 + 8, rects[i]!.w, true);
      dv.setFloat32(i * 16 + 12, rects[i]!.h, true);
    }
    SDL.Renderer.renderFillRects(this.instance, ptr(buf), rects.length);
  }

  drawCircle(x: number, y: number, radius: number) {
    const segments = Math.max(12, Math.floor(radius * 0.4));
    const pts = [] as { x: number; y: number }[];
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push({ x: x + Math.cos(a) * radius, y: y + Math.sin(a) * radius });
    }
    this.drawLines(pts.concat([pts[0]! ]));
  }

  fillCircle(cx: number, cy: number, radius: number) {
    const rects: { x: number; y: number; w: number; h: number }[] = [];
    for (let dy = -radius; dy <= radius; dy++) {
      const y = cy + dy;
      const span = Math.floor(Math.sqrt(radius * radius - dy * dy));
      const x0 = cx - span;
      const w = span * 2 + 1;
      rects.push({ x: x0, y, w, h: 1 });
    }
    this.fillRects(rects);
  }

  setDrawColor(r: number, g: number, b: number, a: number) {
    SDL.Renderer.setDrawColor(this.instance, r, g, b, a);
  }

  renderDebugText(text: string, x: number, y: number): boolean {

      return SDL.Renderer.renderDebugText(this.instance, x as any, y as any, text);
  
  }

  clear() {
    SDL.Renderer.clear(this.instance);
  }

  present() {
    SDL.Renderer.present(this.instance);
  }

  flush(): boolean {
    return SDL.Renderer.flush(this.instance);
  }

  getDrawColor() {
    return SDL.Renderer.getRenderDrawColorFloat(this.instance) ?? null;
  }

  createTexture(format: number, access: number, w: number, h: number) {
    return SDL.Renderer.createTextureWithProperties(this.instance, format, access, w, h, null);
  }

  destroyTexture(texture: any) {
    // Some vendor builds expose a destroyTexture helper; otherwise call the raw SDL binding if available.
    if ((SDL.Renderer as any).destroyTexture) {
      (SDL.Renderer as any).destroyTexture(texture);
      return;
    }
    if ((SDL as any).SDL_DestroyTexture) {
      (SDL as any).SDL_DestroyTexture(texture);
      return;
    }
  }

  drawTexture(texture: any, src?: any, dst?: any) {
    // Prefer high-level wrapper; fall back to tiled/renderTexture or raw SDL binding when available.
    if ((SDL.Renderer as any).renderTexture) {
      (SDL.Renderer as any).renderTexture(this.instance, texture, src ?? null, dst ?? null);
      return;
    }
    if ((SDL.Renderer as any).renderTextureTiled) {
      (SDL.Renderer as any).renderTextureTiled(this.instance, texture, src ?? null, dst ?? null, 0, 0);
      return;
    }
    if ((SDL as any).SDL_RenderTexture) {
      (SDL as any).SDL_RenderTexture(this.instance, texture, src ?? null, dst ?? null);
      return;
    }
  }

  drawTextureRotated(texture: any, src?: any, dst?: any, angle: number = 0, centerPtr: any = null, flip: number = 0) {
    if ((SDL.Renderer as any).renderTextureRotated) {
      (SDL.Renderer as any).renderTextureRotated(this.instance, texture, src ?? null, dst ?? null, angle, centerPtr, flip);
      return;
    }
    if ((SDL as any).SDL_RenderTextureRotated) {
      (SDL as any).SDL_RenderTextureRotated(this.instance, texture, src ?? null, dst ?? null, angle, centerPtr, flip);
      return;
    }
    // fallback: plain drawTexture if rotation not available
    this.drawTexture(texture, src, dst);
  }

  getTextureSize(texture: any) {
    if ((SDL.Renderer as any).getTextureSize) return (SDL.Renderer as any).getTextureSize(texture);
    if ((SDL as any).SDL_GetTextureSize) {
      const buf = new ArrayBuffer(8);
      const p0 = ptr(new Uint8Array(buf, 0));
      const p1 = ptr(new Uint8Array(buf, 4));
      const ok = Boolean((SDL as any).SDL_GetTextureSize(texture, p0, p1));
      if (!ok) return null;
      const dv = new DataView(buf);
      return { w: dv.getFloat32(0, true), h: dv.getFloat32(4, true) };
    }
    return null;
  }

  setTextureAlpha(texture: any, alpha: number) {
    return SDL.Renderer.setTextureAlphaMod(texture, alpha);
  }

  setTextureColor(texture: any, r: number, g: number, b: number) {
    return SDL.Renderer.setTextureColorMod(texture, r, g, b);
  }

  setTextureBlendMode(texture: any, mode: number) {
    if ((SDL.Renderer as any).setTextureBlendMode) return (SDL.Renderer as any).setTextureBlendMode(texture, mode);
    if ((SDL as any).SDL_SetTextureBlendMode) return (SDL as any).SDL_SetTextureBlendMode(texture, mode);
    return false;
  }

  setTextureScaleMode(texture: any, mode: number) {
    if ((SDL.Renderer as any).setTextureScaleMode) return (SDL.Renderer as any).setTextureScaleMode(texture, mode);
    if ((SDL as any).SDL_SetTextureScaleMode) return (SDL as any).SDL_SetTextureScaleMode(texture, mode);
    return false;
  }

  setRenderTarget(target: any | null) {
    if ((SDL.Renderer as any).setRenderTarget) return Boolean((SDL.Renderer as any).setRenderTarget(this.instance, target ?? null));
    if ((SDL as any).SDL_SetRenderTarget) return Boolean((SDL as any).SDL_SetRenderTarget(this.instance, target ?? null));
    return false;
  }

  outputSize() {
    return SDL.Renderer.getRenderOutputSize(this.instance);
  }
}
