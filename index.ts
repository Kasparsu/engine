import { App } from "./src/app";
import { Game } from "./src/game";

const game = new Game();
const app = new App(undefined, undefined, undefined, undefined, game);
app.start();
