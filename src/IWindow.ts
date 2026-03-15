export type SDLWindowHandle = any;

export interface IWindow {
  raw: SDLWindowHandle;
  setTitle(t: string): void;
  setSize(w: number, h: number): void;
}
