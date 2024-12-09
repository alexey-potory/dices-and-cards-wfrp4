import {InitializeGameApplication} from "./ui/applications/initialize-game-application";
import {modulePath} from "./contracts";
import SimpleDiceGameClient from "./core/games/simple-dice-game/client/simple-dice-game-client";
import SimpleDiceGameCore from "./core/games/simple-dice-game/simple-dice-game-core";
import {SimpleDiceGameApplication} from "./ui/games/simple-dice-game-application";

Hooks.on('init', async () => {
    const templatePaths = [

        // Shared
        `${modulePath}/templates/dialogs/item-select-dialog.hbs`,
        `${modulePath}/templates/games/simple-dice-game-components/simple-dice-game-roll-table.hbs`,
        `${modulePath}/templates/games/simple-dice-game-components/simple-dice-game-bid-table.hbs`,
        `${modulePath}/templates/games/simple-dice-game-components/simple-dice-game-money-display.hbs`,
    ];

    await loadTemplates(templatePaths);
});

Hooks.on('ready', () => {
    if (game.user?.isGM) {
        const app = new InitializeGameApplication();
        app.render(true);
    }

    game.dicesAndCards = {
        games: {
            simpleDiceGame: {
                core: new SimpleDiceGameCore(),
                client: new SimpleDiceGameClient()
            }
        }
    }
});