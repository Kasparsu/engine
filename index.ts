
import { createApp } from "./src/App";

const app = createApp()
            .createWindow("My Game", 800, 600)
            .createRenderer()
            .createGame()
            .start();