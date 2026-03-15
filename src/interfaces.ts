import SDL from "bun-sdl3/src/SDL";

export type SDLWindowHandle = any; // wrapper for underlying SDL window handle
export type SDLRendererHandle = any; // wrapper for underlying SDL renderer handle

export interface IWindow {
  raw: SDLWindowHandle;
  setTitle(t: string): void;
  setSize(w: number, h: number): void;
}

export interface IRenderer {
  clear(): void;
  present(): void;
  setDrawColor(r: number, g: number, b: number, a: number): void;
}

export interface IGame {
  init(): Promise<void>;
  update(dt: number): void;
  draw(r: IRenderer): void;
}

export type EngineConfig = {
  title: string;
  width: number;
  height: number;
};
