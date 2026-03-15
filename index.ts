
import { createApp } from "./src/App";

const app = createApp({"title": "My Game", "width": 800, "height": 600})
            .createWindow("My Game", 800, 600)
            .createRenderer()
            .createGame()
            .start();