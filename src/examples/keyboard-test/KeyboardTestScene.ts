import { Scene } from "../../Scene";
import type { Game } from "../../Game";
import type { IRenderer } from "../../IRenderer";
import { InputManager } from "../../InputManager";

export class KeyboardTestScene extends Scene {
  pressed = false;

  constructor(game: Game, input?: InputManager) {
    super(game, input);
  }

  override update(dt: number): void {
    // nothing needed per-frame; key state is queried during draw
  }

  override draw(r: IRenderer): void {
    const out = r.outputSize?.() ?? { w: 800, h: 600 };
    r.setDrawColor(10, 10, 10, 255);
    r.clear();

    // Draw a standard keyboard layout (letters, numbers and common keys)
    r.setDrawColor(220, 220, 220, 255);
    const showBackdrop = Boolean(process?.env?.SHOW_KEY_BACKDROP);
    const rows: string[][] = [
      // function key row
      ["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"],
      ["grave", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "minus", "equals", "backspace"],
      ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "leftbracket", "rightbracket", "backslash"],
      ["capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "semicolon", "apostrophe", "enter"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", "comma", "period", "slash", "shift"],
      ["ctrl", "alt", "space", "alt", "ctrl"],
    ];

    const keySpacingX = 48;
    const keySpacingY = 64;
    const startY = Math.floor(out.h * 0.18);

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex]!;
      const rowWidth = (row.length - 1) * keySpacingX;
      const startX = Math.floor((out.w - rowWidth) / 2);
      const y = startY + rowIndex * keySpacingY;
      for (let i = 0; i < row.length; i++) {
        const key = row[i]!;
        const x = startX + i * keySpacingX;
        const pressed = (() => {
          const isDown = (k: string) => !!this.input?.isKeyDown?.(k);
          if (isDown(key)) return true;
          const lowKey = String(key).toLowerCase();
          if (isDown(lowKey)) return true;
          // also accept numpad / kp variants for single-digit keys
          if (/^[0-9]$/.test(lowKey)) {
            if (isDown(`num${lowKey}`)) return true;
            if (isDown(`kp_${lowKey}`)) return true;
          }
          return false;
        })();
        // display label mapping for special keys and punctuation
        const disp = (() => {
          const map: Record<string, string> = {
            space: "Space",
            backspace: "Back",
            tab: "Tab",
            enter: "Enter",
            capslock: "Caps",
            shift: "Shift",
            ctrl: "Ctrl",
            alt: "Alt",
            meta: "Meta",
            left: "←",
            right: "→",
            up: "↑",
            down: "↓",
            minus: "-",
            equals: "=",
            leftbracket: "[",
            rightbracket: "]",
            backslash: "\\",
            semicolon: ";",
            apostrophe: "'",
            comma: ",",
            period: ".",
            slash: "/",
            grave: "`",
            quote: '"',
            quoteleft: '`',
            num0: "0",
            num1: "1",
            num2: "2",
            num3: "3",
            num4: "4",
            num5: "5",
            num6: "6",
            num7: "7",
            num8: "8",
            num9: "9",
          };
          const ks = String(key);
          if (map[ks]) return map[ks];
          return ks.length === 1 ? ks.toUpperCase() : ks;
        })();

        if (showBackdrop) {
          // backdrop width depends on key type
          const wideKeys = new Set(["backspace", "enter"]);
          const mediumKeys = new Set(["tab", "capslock", "shift", "ctrl", "alt", "space"]);
          const w = wideKeys.has(key) ? 72 : (mediumKeys.has(key) ? 56 : 36);
          r.setDrawColor(30, 30, 30, 255);
          r.fillRect?.({ x: x - Math.floor(w/2), y: y - 18, w, h: 36 });
        }
        // color: green when pressed, red otherwise
        if (pressed) r.setDrawColor(40, 200, 80, 255);
        else r.setDrawColor(220, 24, 24, 255);
        r.renderDebugText?.(disp, x, y);
      }
    }

    // Navigation cluster (to the right)
    const navCols = [
      ["insert", "home", "pageup"],
      ["delete", "end", "pagedown"],
    ];
    const navStartX = Math.floor(out.w * 0.78);
    for (let nr = 0; nr < navCols.length; nr++) {
      const col = navCols[nr]!;
      const y = startY + nr * keySpacingY;
      for (let i = 0; i < col.length; i++) {
        const key = col[i]!;
        const x = navStartX + i * keySpacingX;
        const pressed = !!this.input?.isKeyDown?.(key) || !!this.input?.isKeyDown?.(key.toLowerCase());
        const _k = String(key);
        const disp = _k.length === 1 ? _k.toUpperCase() : (_k.charAt(0).toUpperCase() + _k.slice(1));
        if (showBackdrop) {
          r.setDrawColor(30,30,30,255);
          r.fillRect?.({ x: x - 18, y: y - 18, w: 48, h: 36 });
        }
        if (pressed) r.setDrawColor(40,200,80,255); else r.setDrawColor(220,24,24,255);
        r.renderDebugText?.(disp, x, y);
      }
    }

    // Numpad on far right
    const numpad = [
      ["num7","num8","num9"],
      ["num4","num5","num6"],
      ["num1","num2","num3"],
      ["num0","",""],
    ];
    const padStartX = Math.floor(out.w * 0.9);
    for (let pr = 0; pr < numpad.length; pr++) {
      const row = numpad[pr]!;
      const y = startY + (pr+0) * keySpacingY;
      for (let i = 0; i < row.length; i++) {
        const key = row[i]!;
        if (!key) continue;
        const x = padStartX + i * keySpacingX;
        const pressed = !!this.input?.isKeyDown?.(key) || !!this.input?.isKeyDown?.(key.toLowerCase());
        const _k2 = String(key);
        const disp = _k2.startsWith("num") ? _k2.slice(3) : _k2;
        if (showBackdrop) {
          r.setDrawColor(30,30,30,255);
          r.fillRect?.({ x: x - 18, y: y - 18, w: 36, h: 36 });
        }
        if (pressed) r.setDrawColor(40,200,80,255); else r.setDrawColor(220,24,24,255);
        r.renderDebugText?.(disp, x, y);
      }
    }
    r.present();
  }
}

export default KeyboardTestScene;
