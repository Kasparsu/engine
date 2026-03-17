import { describe, it, expect } from "bun:test";
import SDL from "bun-sdl3/src/SDL";
import { SDLRenderer } from "../src/SDLRenderer";

describe("SDLRenderer more ops", () => {
  it("handles rects and texture operations via stubs", () => {
    const calls: any[] = [];
    const orig = (SDL as any).Renderer ?? {};
    const newR = Object.assign({}, orig);
    try { Object.defineProperty(SDL, 'Renderer', { value: newR, writable: true, configurable: true }); } catch (e) { (SDL as any).Renderer = newR; }

    newR.renderFillRects = (ren: any, ptr: any, count: number) => { calls.push(["fillRects", count]); return true; };
    newR.renderRects = (ren: any, ptr: any, count: number) => { calls.push(["rects", count]); return true; };
    newR.createTextureWithProperties = (renderer: any, format: number, access: number, w: number, h: number, propsPtr: any) => { calls.push(["createTexture", w, h]); return { id: 42 }; };
    newR.getTextureSize = (tex: any) => { calls.push(["getTextureSize"]); return { w: 64, h: 32 }; };
    newR.setTextureBlendMode = (tex: any, mode: number) => { calls.push(["setBlend", mode]); return true; };
    newR.setTextureScaleMode = (tex: any, mode: number) => { calls.push(["setScale", mode]); return true; };
    newR.destroyTexture = (tex: any) => { calls.push(["destroy", tex]); };
    newR.renderTexture = (ren: any, tex: any, src: any, dst: any) => { calls.push(["renderTexture", tex]); return true; };
    newR.renderTextureRotated = (ren: any, tex: any, src: any, dst: any, angle: number, center: any, flip: number) => { calls.push(["renderTextureRotated", angle]); return true; };
    newR.setRenderTarget = (ren: any, target: any) => { calls.push(["setRenderTarget", target ? true : false]); return true; };

    const r = new SDLRenderer({ raw: 1 } as any);

    r.fillRect({ x: 1, y: 2, w: 3, h: 4 });
    r.fillRects([{ x: 1, y: 2, w: 3, h: 4 }, { x: 5, y: 6, w: 7, h: 8 }]);
    r.drawRect({ x: 0, y: 0, w: 10, h: 10 });
    r.drawRects([{ x: 0, y: 0, w: 1, h: 1 }, { x: 2, y: 2, w: 2, h: 2 }]);

    const tex = r.createTexture(0, 0, 64, 32);
    expect(tex).toBeTruthy();
    const size = r.getTextureSize(tex);
    expect(size?.w).toBe(64);
    r.setTextureBlendMode(tex, 1);
    r.setTextureScaleMode(tex, 2);
    r.drawTexture(tex);
    r.drawTextureRotated(tex, undefined, undefined, 45);
    r.setRenderTarget(null);
    r.destroyTexture(tex);

    expect(calls.some((c) => c[0] === "fillRects")).toBe(true);
    expect(calls.some((c) => c[0] === "rects")).toBe(true);
    expect(calls.some((c) => c[0] === "createTexture")).toBe(true);
    expect(calls.some((c) => c[0] === "renderTexture")).toBe(true);
    expect(calls.some((c) => c[0] === "renderTextureRotated")).toBe(true);
  });
});
