export type SDLRendererHandle = any;

export interface IRenderer {
  // frame control
  clear(): void;
  present(): void;
  flush?(): boolean;
  // draw color
  setDrawColor(r: number, g: number, b: number, a: number): void;
  setDrawColorHex?(hex: string): void;
  // primitive drawing
  drawPoint?(x: number, y: number): void;
  drawLine?(x1: number, y1: number, x2: number, y2: number): void;
  drawRect?(rect: { x: number; y: number; w: number; h: number }): void;
  fillRect?(rect: { x: number; y: number; w: number; h: number }): void;
  drawCircle?(x: number, y: number, r: number): void;
  fillCircle?(x: number, y: number, r: number): void;
  drawPoints?(points: { x: number; y: number }[]): void;
  drawLines?(points: { x: number; y: number }[]): void;
  drawRects?(rects: { x: number; y: number; w: number; h: number }[]): void;
  fillRects?(rects: { x: number; y: number; w: number; h: number }[]): void;
  setDrawColorHex?(hex: string): void;
  getDrawColor?(): { r: number; g: number; b: number; a: number } | null;
  // texture management
  loadTexture?(path: string): any;
  createTexture?(format: number, access: number, w: number, h: number): any;
  destroyTexture?(texture: any): void;
  drawTexture?(texture: any, src?: any, dst?: any): void;
  drawTextureRotated?(texture: any, src?: any, dst?: any, angle?: number, centerPtr?: any, flip?: number): void;
  getTextureSize?(texture: any): { w: number; h: number } | null;
  setTextureAlpha?(texture: any, alpha: number): boolean;
  setTextureColor?(texture: any, r: number, g: number, b: number): boolean;
  setTextureBlendMode?(texture: any, mode: number): boolean;
  setTextureScaleMode?(texture: any, mode: number): boolean;
  createRenderTarget?(w: number, h: number): any;
  resetRenderTarget?(): void;
  // render targets
  setRenderTarget?(target: any | null): boolean;
  // info
  outputSize?(): { w: number; h: number } | null;
  raw?: SDLRendererHandle;
  renderDebugText?(text: string, x: number, y: number): boolean;
}
