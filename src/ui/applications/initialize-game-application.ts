import {modulePath} from "../../contracts";

export class InitializeGameApplication extends Application {
    static get defaultOptions() {

        const templatePath =
            `${modulePath}/templates/applications/initialize-game-application.hbs`;

        const startWidth = 650;
        const startHeight = 500;

        const settings = {
            title: 'Initialize game',
            template: templatePath,
            width: startWidth,
            height: startHeight,
            resizable: true,
            classes: [
                'initialize-game-application'
            ]
        };

        return foundry.utils.mergeObject(super.defaultOptions, settings);
    }
}