import { createApp } from "../../App";
import { Game } from "../../Game";
import ScreenDrawScene from "./ScreenDrawScene";

async function main() {
  const app = createApp();
  app.createWindow("Screen Draw", 1024, 640).createRenderer();
  app.game = new Game();
  // @ts-ignore
  app.game.setScene(new ScreenDrawScene(app.game));
  await app.start();
}

main();
