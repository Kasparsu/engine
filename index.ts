import { App } from "./src/app";
import { Game } from "./src/game";

const game = new Game(
  async () => {
    console.log("Game initialized");
  },
    (dt) => {
    console.log("Game updated", dt);
    },
    (renderer) => {
    console.log("Game drawn", renderer);
        renderer.setDrawColor(255, 0, 0, 255);
        renderer.clear();
        renderer.present();
    }
);
const app = new App(undefined, undefined, undefined, undefined, game);
app.start();
