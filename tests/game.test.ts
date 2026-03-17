import { describe, it, expect } from "bun:test";
import { Game } from "../src/Game";
import { Scene } from "../src/Scene";

class DummyScene extends Scene {
  inited = 0;
  updated = 0;
  drawn = 0;
  constructor() { super({} as any); }
  override async init() { this.inited += 1; }
  override update(dt: number) { this.updated += 1; }
  override draw(r: any) { this.drawn += 1; }
}

describe("Game", () => {
  it("sets scene and forwards init/update/draw", async () => {
    const g = new Game();
    const s = new DummyScene();
    g.setScene(s as any);
    await g.init();
    expect(s.inited).toBe(1);
    g.update(0.02);
    expect(s.updated).toBe(1);
    g.draw({ clear() {}, present() {}, setDrawColor() {} } as any);
    expect(s.drawn).toBe(1);
  });
});
