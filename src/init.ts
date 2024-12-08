import {InitializeGameApplication} from "./ui/applications/initialize-game-application";
import {modulePath} from "./contracts";

Hooks.on('init', async () => {
    const templatePaths = [

        // Shared
        `${modulePath}/templates/dialogs/item-select-dialog.hbs`,
    ];

    await loadTemplates(templatePaths);
});

Hooks.on('ready', () => {
    const app = new InitializeGameApplication();

    app.render(true);
});