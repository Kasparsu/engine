import { describe, it, expect } from "bun:test";
import SDL from "bun-sdl3/src/SDL";
import { SDLRenderer } from "../src/SDLRenderer";

describe("SDLRenderer (partial)", () => {
  it("calls underlying renderPoints for drawPoint/drawPoints", () => {
    const calls: any[] = [];
    // stub renderer functions
    // clone the renderer object to allow safe mutation in tests
    const origRend = (SDL as any).Renderer ?? {};
    const newRend = Object.assign({}, origRend);
    try { Object.defineProperty(SDL, 'Renderer', { value: newRend, writable: true, configurable: true }); } catch (e) { (SDL as any).Renderer = newRend; }
    newRend.create = (winPtr: any) => 1;
    newRend.renderPoints = (ren: any, ptr: any, count: number) => { calls.push(["points", count]); return true; };

    const r = new SDLRenderer({ raw: 1 } as any);
    r.drawPoint(1,2);
    r.drawPoints([{x:1,y:2},{x:3,y:4}]);
    expect(calls.length).toBe(2);
    expect(calls[0][0]).toBe("points");
    expect(calls[0][1]).toBe(1);
    expect(calls[1][1]).toBe(2);
  });
});
