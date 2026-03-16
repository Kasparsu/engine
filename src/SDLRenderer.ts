import SDL from "bun-sdl3/src/SDL";
import type { IRenderer, SDLRendererHandle } from "./IRenderer";

export class SDLRenderer implements IRenderer {
  instance: SDLRendererHandle;
  constructor(windowInstance: any) {
    this.instance = SDL.Renderer.create(windowInstance);
    console.debug("[SDLRenderer] created");
  }

  get raw() {
    return this.instance;
  }

  setDrawColor(r: number, g: number, b: number, a: number) {
    SDL.Renderer.setDrawColor(this.instance, r, g, b, a);
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
    SDL.Renderer.destroyTexture(texture);
  }

  drawTexture(texture: any, src?: any, dst?: any) {
    SDL.Renderer.renderTexture(this.instance, texture, src ?? null, dst ?? null);
  }

  drawTextureRotated(texture: any, src?: any, dst?: any, angle: number = 0, centerPtr: any = null, flip: number = 0) {
    SDL.Renderer.renderTextureRotated(this.instance, texture, src ?? null, dst ?? null, angle, centerPtr, flip);
  }

  getTextureSize(texture: any) {
    return SDL.Renderer.getTextureSize(texture);
  }

  setTextureAlpha(texture: any, alpha: number) {
    return SDL.Renderer.setTextureAlphaMod(texture, alpha);
  }

  setTextureColor(texture: any, r: number, g: number, b: number) {
    return SDL.Renderer.setTextureColorMod(texture, r, g, b);
  }

  setTextureBlendMode(texture: any, mode: number) {
    return SDL.Renderer.setTextureBlendMode(texture, mode);
  }

  setTextureScaleMode(texture: any, mode: number) {
    return SDL.Renderer.setTextureScaleMode(texture, mode);
  }

  setRenderTarget(target: any | null) {
    return Boolean(SDL.Renderer.setRenderTarget(this.instance, target ?? null));
  }

  outputSize() {
    return SDL.Renderer.getRenderOutputSize(this.instance);
  }
}
