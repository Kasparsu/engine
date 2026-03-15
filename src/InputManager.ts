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
    // try to normalize common keyboard events
    try {
      const t = event?.type;
      // numeric constants can vary; attempt to detect by name
      if (t === undefined && event?.message) {
        // nothing
      }
      // best-effort mapping: if it has 'keysym' or 'key' fields
      if (event?.keysym || event?.key) {
        const key = event.keysym?.sym ?? event.key ?? String(event.keysym?.scancode ?? "");
        if (event.type === (globalThis as any).SDL?.KEYDOWN || event.type === "KEYDOWN") {
          this.handleEvent({ type: "keydown", key });
          return;
        }
        if (event.type === (globalThis as any).SDL?.KEYUP || event.type === "KEYUP") {
          this.handleEvent({ type: "keyup", key });
          return;
        }
      }
    } catch {}

    // fallback: emit as generic sdl event
    this.handleEvent({ type: "sdl", event });
  }
}
