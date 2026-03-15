import SDL from "bun-sdl3/src/SDL";
import { IWindow, SDLWindowHandle } from "./IWindow";

export class SDLWindow implements IWindow {
  instance: SDLWindowHandle;

  constructor(
    public title = "Hello World",
    public width = 800,
    public height = 600,
    public flags = SDL.Window.WINDOW.RESIZABLE
  ) {
    this.instance = SDL.Window.create(this.title, this.width, this.height, this.flags);
  }

  get raw() {
    return this.instance;
  }

  setTitle(title: string) {
    SDL.Window.setTitle(this.instance, title);
    this.title = title;
  }

  setSize(width: number, height: number) {
    SDL.Window.setSize(this.instance, width, height);
    this.width = width;
    this.height = height;
  }
}
