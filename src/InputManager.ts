export type InputEvent =
  | { type: "keydown"; key: string }
  | { type: "keyup"; key: string }
  | { type: "mouse"; event: any }
  | { type: "sdl"; event: any };

export type InputListener = (e: InputEvent) => void;

export class InputManager {
  keyState = new Map<string, boolean>();
  listeners: InputListener[] = [];

  constructor() {
    console.debug("[InputManager] created");
  }

  isKeyDown(key: string): boolean {
    return !!this.keyState.get(key);
  }

  on(cb: InputListener) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  handleEvent(e: InputEvent) {
    if (e.type === "keydown") this.keyState.set(e.key, true);
    if (e.type === "keyup") this.keyState.set(e.key, false);
    for (const l of this.listeners) l(e);
  }

  // Helper to forward raw SDL events (keeps implementation generic)
  handleRawSDL(event: any) {
    // Parse the vendor-parsed event shape produced by SDL.Events.parse/poll
    try {
      // keyboard events produced by the vendor wrapper include 'key', 'scancode', 'down', and 'keyName'
      if (typeof event === "object" && event !== null && ("down" in event) && ("keyName" in event || "key" in event)) {
        const down = Boolean((event as any).down);
        // Prefer human-friendly scancode name if the keyName is just a numeric code
        let rawName = (event as any).keyName ?? String((event as any).key ?? "");
        const scName = (event as any).scancodeName ?? (event as any).scancode ?? null;
        if (/^\d+$/.test(String(rawName)) && scName) {
          rawName = scName;
        }
        const key = InputManager.normalizeKeyName(String(rawName));
        if (down) {
          this.handleEvent({ type: "keydown", key });
        } else {
          this.handleEvent({ type: "keyup", key });
        }
        return;
      }
    } catch (e) {
      // fall through to generic emit
    }

    // fallback: emit as generic sdl event
    this.handleEvent({ type: "sdl", event });
  }
}

// Static helpers
export namespace InputManager {
  export function normalizeKeyName(rawName: string) {
    const s = String(rawName ?? "").trim();
    if (s === "" || s === " ") return "space";
    // Normalize common SDL prefix forms (SDLK_, SDL_SCANCODE_, etc.) and Num/KP forms
    let low = s.toLowerCase();
    // Strip SDL prefixes if present
    low = low.replace(/^sdlk_/, "").replace(/^sdl_scancode_/, "").replace(/^sdl_/, "");
    // Normalize keypad/num prefixes
    if (/^num(\d)$/i.test(low)) {
      return low.toLowerCase();
    }
    if (/^kp[_-]?(.+)$/i.test(low)) {
      // keep kp_ prefix for keypad keys
      const m = low.match(/^kp[_-]?(.*)$/i);
      if (m && m[1]) return `kp_${m[1].toLowerCase()}`;
    }
    // Common mappings
    if (low === "return" || low === "ret") return "enter";
    if (low === "bksp" || low === "backspace" || low === "backspace") return "backspace";
    if (low === "capslock" || low === "caps lock") return "capslock";
    if (low === "left shift" || low === "right shift" || low === "lshift" || low === "rshift" || low === "shift") return "shift";
    if (low === "left ctrl" || low === "right ctrl" || low === "lctrl" || low === "rctrl" || low === "control" || low === "ctrl") return "ctrl";
    if (low === "left alt" || low === "right alt" || low === "lalt" || low === "ralt" || low === "alt" || low === "altgr") return "alt";
    if (low === "lgui" || low === "rgui" || low === "left windows" || low === "right windows" || low === "win" || low === "meta" || low === "super") return "meta";
    if (low === "esc" || low === "escape") return "escape";
    if (low === "tab") return "tab";
    if (low === "space") return "space";
    if (low === "enter") return "enter";
    // arrows and navigation
    if (low === "left" || low === "arrowleft") return "left";
    if (low === "right" || low === "arrowright") return "right";
    if (low === "up" || low === "arrowup") return "up";
    if (low === "down" || low === "arrowdown") return "down";
    if (low === "insert" || low === "ins") return "insert";
    if (low === "delete" || low === "del") return "delete";
    if (low === "pageup" || low === "pgup") return "pageup";
    if (low === "pagedown" || low === "pgdn" || low === "pgdown") return "pagedown";
    if (low === "home") return "home";
    if (low === "end") return "end";
    if (low === "printscreen" || low === "print" || low === "prtsc") return "printscreen";
    if (low === "scrolllock" || low === "scrlk") return "scrolllock";
    if (low === "pause" || low === "break") return "pause";
    if (low === "numlock") return "numlock";
    // function keys F1..F24
    const fmatch = low.match(/^f(\d{1,2})$/i);
    if (fmatch) return fmatch[0].toLowerCase();
    // keypad keys often start with kp_
    if (low.startsWith("kp_")) return low.replace(/^kp_/, "kp_");
    // default: return lowercased single-char or word
    return low;
  }
}
