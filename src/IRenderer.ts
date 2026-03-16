export type SDLRendererHandle = any;

export interface IRenderer {
  // frame control
  clear(): void;
  present(): void;
  flush?(): boolean;
  // draw color
  setDrawColor(r: number, g: number, b: number, a: number): void;
  setDrawColorHex?(hex: string): void;
  getDrawColor?(): { r: number; g: number; b: number; a: number } | null;
  // texture management
  createTexture?(format: number, access: number, w: number, h: number): any;
  destroyTexture?(texture: any): void;
  drawTexture?(texture: any, src?: any, dst?: any): void;
  drawTextureRotated?(texture: any, src?: any, dst?: any, angle?: number, centerPtr?: any, flip?: number): void;
  getTextureSize?(texture: any): { w: number; h: number } | null;
  setTextureAlpha?(texture: any, alpha: number): boolean;
  setTextureColor?(texture: any, r: number, g: number, b: number): boolean;
  setTextureBlendMode?(texture: any, mode: number): boolean;
  setTextureScaleMode?(texture: any, mode: number): boolean;
  // render targets
  setRenderTarget?(target: any | null): boolean;
  // info
  outputSize?(): { w: number; h: number } | null;
  raw?: SDLRendererHandle;
}
