export type SDLRendererHandle = any;

export interface IRenderer {
  clear(): void;
  present(): void;
  setDrawColor(r: number, g: number, b: number, a: number): void;
}
