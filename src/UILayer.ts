import type { IRenderer } from "./IRenderer";

export abstract class UILayer {
  visible = true;

  constructor(public name?: string) {}

  abstract init(): Promise<void>;
  abstract update(dt: number): void;
  abstract draw(r: IRenderer): void;
}
