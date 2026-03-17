import { describe, it, expect } from "bun:test";
import { InputManager } from "../src/InputManager";

describe("InputManager.normalizeKeyName", () => {
  it("normalizes basic keys and variants", () => {
    const norm = InputManager.normalizeKeyName;
    expect(norm("")).toBe("space");
    expect(norm(" ")).toBe("space");
    expect(norm("LCTRL")).toBe("ctrl");
    expect(norm("rshift")).toBe("shift");
    expect(norm("KP_1")).toBe("kp_1");
    expect(norm("num1")).toBe("num1");
    expect(norm("Return")).toBe("enter");
    expect(norm("BACKSPACE")).toBe("backspace");
    expect(norm("F12")).toBe("f12");
    expect(norm("ArrowLeft")).toBe("left");
  });
  it("normalizes a broader set of keys (keyboard coverage)", () => {
    const norm = InputManager.normalizeKeyName;
    const samples: Array<[string, string]> = [
      ["F1", "f1"],
      ["F10", "f10"],
      ["Escape", "escape"],
      ["Tab", "tab"],
      ["Space", "space"],
      ["Return", "enter"],
      ["Backspace", "backspace"],
      ["Insert", "insert"],
      ["Delete", "delete"],
      ["Home", "home"],
      ["End", "end"],
      ["PageUp", "pageup"],
      ["PageDown", "pagedown"],
      ["NumLock", "numlock"],
      ["KP_1", "kp_1"],
      ["KP-2", "kp_2"],
      ["Num1", "num1"],
      ["LCTRL", "ctrl"],
      ["RSHIFT", "shift"],
      ["LALT", "alt"],
      ["LGUI", "meta"],
    ];
    for (const [raw, expected] of samples) {
      expect(norm(raw)).toBe(expected);
    }
  });
});

describe("InputManager.handleRawSDL", () => {
  it("emits keydown/keyup with normalized names and prefers scancodeName when keyName numeric", () => {
    const im = new InputManager();
    const events: any[] = [];
    // override handleEvent for capturing
    (im as any).handleEvent = (e: any) => events.push(e);

    im.handleRawSDL({ down: true, keyName: "a" });
    im.handleRawSDL({ down: false, keyName: "a" });

    // numeric keyName should prefer scancodeName
    im.handleRawSDL({ down: true, keyName: "107", scancodeName: "b" });

    // keypad form
    im.handleRawSDL({ down: true, keyName: "KP_5" });

    // non-key events should emit sdl fallback
    im.handleRawSDL({ type: "mouse", x: 10, y: 20 });

    expect(events.length).toBe(5);
    expect(events[0]).toEqual({ type: "keydown", key: "a" });
    expect(events[1]).toEqual({ type: "keyup", key: "a" });
    expect(events[2]).toEqual({ type: "keydown", key: "b" });
    expect(events[3]).toEqual({ type: "keydown", key: "kp_5" });
    expect(events[4].type).toBe("sdl");
  });
});
