import {InitializeGameApplication} from "./ui/applications/initialize-game-application";

Hooks.on('ready', () => {
    const app = new InitializeGameApplication();

    app.render(true);
});