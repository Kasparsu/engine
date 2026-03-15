import type { IRenderer } from "./IRenderer";
import type { InputManager } from "./InputManager";

export abstract class UILayer {
  visible = true;

  constructor(public name?: string) {}
  input?: InputManager;

  abstract init(): Promise<void>;
  abstract update(dt: number): void;
  abstract draw(r: IRenderer): void;
}
