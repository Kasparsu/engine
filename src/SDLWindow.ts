import SDL from "bun-sdl3/src/SDL";
// use high-level SDL wrappers instead of direct FFI
import type { IWindow, SDLWindowHandle } from "./IWindow";

export class SDLWindow implements IWindow {
  instance: SDLWindowHandle;

  surface: any | null = null;

  constructor(
    public title = "Hello World",
    public width = 800,
    public height = 600,
    public flags = SDL.Window.WINDOW.RESIZABLE
  ) {
    this.instance = SDL.Window.create(this.title, this.width, this.height, this.flags);
    console.debug(`[SDLWindow] created title=${this.title} size=${this.width}x${this.height}`);
  }

  get raw() {
    return this.instance;
  }

  setTitle(title: string) {
    SDL.Window.setTitle(this.instance, title);
    this.title = title;
  }

  setSize(width: number, height: number) {
    SDL.Window.setSize(this.instance, width, height);
    this.width = width;
    this.height = height;
  }

  destroy() {
    try {
      if (this.surface) this.destroySurface();
    } catch {}
    SDL.Window.destroy(this.instance);
    this.instance = null as any;
  }

  getSurface() {
    if (this.surface) return this.surface;
    try {
      const s = SDL.Window.getWindowSurface(this.instance);
      this.surface = s || null;
      return this.surface;
    } catch (e) {
      return null;
    }
  }

  destroySurface() {
    if (!this.surface) return;
    try {
      SDL.Window.destroySurfaceObject(this.surface);
    } catch {}
    this.surface = null;
  }

  updateSurface(): boolean {
    try {
      return Boolean(SDL.Window.updateWindowSurface(this.instance));
    } catch {
      return false;
    }
  }

  show(): boolean {
    return SDL.Window.show(this.instance);
  }

  hide(): boolean {
    return SDL.Window.hide(this.instance);
  }

  maximize(): boolean {
    return SDL.Window.maximize(this.instance);
  }

  minimize(): boolean {
    return SDL.Window.minimize(this.instance);
  }

  restore(): boolean {
    return SDL.Window.restore(this.instance);
  }

  raise(): boolean {
    return SDL.Window.raise(this.instance);
  }

  center(): void {
    try {
      const displayID = SDL.Window.getPrimaryDisplay();
      const bounds = SDL.Window.getDisplayBounds(displayID);
      if (!bounds) return;
      const dx = bounds.x;
      const dy = bounds.y;
      const dw = bounds.w;
      const dh = bounds.h;
      const wx = Math.floor(dx + (dw - (this.width || 0)) / 2);
      const wy = Math.floor(dy + (dh - (this.height || 0)) / 2);
      SDL.Window.setPosition(this.instance, wx, wy);
    } catch {}
  }

  getDisplayBounds(displayID?: number) {
    try {
      const id = typeof displayID === "number" ? displayID : SDL.Window.getPrimaryDisplay();
      return SDL.Window.getDisplayBounds(id);
    } catch {
      return null;
    }
  }
}
