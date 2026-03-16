export type SDLWindowHandle = any;

export interface IWindow {
  raw: SDLWindowHandle;
  title?: string;
  width?: number;
  height?: number;
  // basic
  setTitle?(t: string): void;
  setSize?(w: number, h: number): void;
  // surface
  surface?: any | null;
  getSurface?(): any | null;
  destroySurface?(): void;
  updateSurface?(): boolean;
  // window state
  show?(): boolean;
  hide?(): boolean;
  maximize?(): boolean;
  minimize?(): boolean;
  restore?(): boolean;
  raise?(): boolean;
  destroy?(): void;
  // helpers
  center?(): void;
  getDisplayBounds?(displayID?: number): { x: number; y: number; w: number; h: number } | null;
}
