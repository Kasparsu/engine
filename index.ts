import SDL from "bun-sdl3/src/SDL";
import { createApp } from "./src/App";


//         SDL.init(SDL.INIT.VIDEO);
//         let window = SDL.Window.create("Hello World", 800, 600, SDL.Window.WINDOW.RESIZABLE);
//         let renderer = SDL.Renderer.create(window);
  
// while(true) {
//     const event = SDL.Events.poll();
//     if (event) {
//         if (event.type === SDL.Events.QUIT) break;
//     }
//     SDL.Renderer.setDrawColor(renderer, 0, 0, 0, 255);
//     SDL.Renderer.clear(renderer);
//     SDL.Renderer.present(renderer);

// }

let app = createApp().createWindow("My Game", 800, 600).createRenderer().createGame().start();