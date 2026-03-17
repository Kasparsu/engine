import { createApp } from "../../App";
import { BasicBlackGame } from "./BasicBlackGame";

async function main() {
  const app = createApp();
  app.createWindow("Basic Black", 800, 600).createRenderer();
  // @ts-ignore
  app.game = new BasicBlackGame();
  await app.start();
}

main();
