import { createApp } from "../../App";
import HelloWorldScene from "./HelloWorldScene";

async function main() {
	const app = createApp();
	app.createWindow("Hello World", 640, 360).createRenderer();
	// @ts-ignore
	app.game = new (await import("../../Game")).Game();
	// @ts-ignore
	app.game.setScene(new HelloWorldScene(app.game));
	await app.start();
}

main();
