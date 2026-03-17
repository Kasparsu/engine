import { describe, it, expect } from "bun:test";
import SDL from "bun-sdl3/src/SDL";
import { Engine } from "../src/Engine";
import { App, createApp } from "../src/App";

describe("Engine and App (basic)", () => {
  it("runs a single loop iteration with a game that stops the engine", async () => {
    // stub SDL.init and Events.poll
    // safely stub SDL properties by cloning
    try { (SDL as any).init = (n: any) => {}; } catch (e) { Object.defineProperty(SDL, 'init', { value: (n: any) => {}, writable: true, configurable: true }); }
    const initObj = (SDL as any).INIT ?? {};
    try { Object.defineProperty(SDL, 'INIT', { value: initObj, writable: true, configurable: true }); } catch (e) { (SDL as any).INIT = initObj; }
    const origEvents = (SDL as any).Events ?? {};
    const newEvents = Object.assign({}, origEvents);
    try { Object.defineProperty(SDL, 'Events', { value: newEvents, writable: true, configurable: true }); } catch (e) { (SDL as any).Events = newEvents; }
    newEvents.poll = () => null;

    const mockRenderer = {
      setDrawColor() {}, clear() {}, present() {}, flush() { return true; }
    } as any;
    const mockWindow = { raw: 1 } as any;

    const engine = new Engine(undefined, mockWindow, mockRenderer);
    let updates = 0;
    const game = {
      activeScene: undefined,
      init: async () => {},
      update: (dt: number) => { updates++; engine.stop(); },
      draw: (r: any) => {},
    } as any;

    await engine.run(game);
    expect(updates).toBeGreaterThanOrEqual(1);
  });

  it("creates App and wires engine", () => {
    (SDL as any).init = () => {};
    const app = createApp();
    expect(app).toBeInstanceOf(App);
    app.stop();
  });
});
