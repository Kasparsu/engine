import { describe, it, expect } from "bun:test";
import { Scene } from "../src/Scene";
import { UILayer } from "../src/UILayer";

class MockLayer extends UILayer {
  inited = false;
  updated = 0;
  drawn = 0;
  constructor(name?: string) { super(name); }
  async init() { this.inited = true; }
  update(dt: number) { this.updated += 1; }
  draw() { this.drawn += 1; }
}

const MockGame = {} as any;

class MockScene extends Scene {
  updated = 0;
  drawn = 0;
  constructor() { super(MockGame); }
  override update(dt: number) { this.updated += 1; }
  override draw(r: any) { this.drawn += 1; super.draw(r); }
}

describe("Scene and UILayer", () => {
  it("initializes layers and forwards input", async () => {
    const scene = new MockScene();
    const layer = new MockLayer("test");
    scene.addLayer(layer);
    scene.input = undefined;
    await scene.init();
    expect(layer.inited).toBe(true);
  });

  it("update and draw call propagation", () => {
    const scene = new MockScene();
    const layer = new MockLayer("test2");
    scene.addLayer(layer);
    scene.update(0.016);
    expect(scene.updated).toBe(1);
    scene.draw({});
    expect(layer.drawn).toBe(1);
  });
});
