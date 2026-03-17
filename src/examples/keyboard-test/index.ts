import { createApp } from "../../App";
import { Game } from "../../Game";
import KeyboardTestScene from "./KeyboardTestScene";

async function main() {
  const app = createApp();
  app.createWindow("Keyboard Test", 640, 360).createRenderer();
  // @ts-ignore
  app.game = new Game();
  // @ts-ignore
  app.game.setScene(new KeyboardTestScene(app.game));
  await app.start();
}

main();
