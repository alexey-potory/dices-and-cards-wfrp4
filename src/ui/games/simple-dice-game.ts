import {modulePath} from "../../contracts";
import {LiteEvent} from "../../core/events/lite-event";

export class SimpleDiceGameApplication extends Application {
    private readonly onClose = new LiteEvent<void>();

    public get Closed() { return this.onClose.expose() }

    constructor(options = {}) {
        super();
    }

    getData(options:any) {
        return {}
    }

    static get defaultOptions() {

        const templatePath =
            `${modulePath}/templates/games/simple-dice-game.hbs`;

        const startWidth = 650;
        const startHeight = 500;

        const settings = {
            title: 'Simple dice game',
            template: templatePath,
            width: startWidth,
            height: startHeight,
            resizable: true,
            classes: [
                'simple-dice-game'
            ]
        };

        return foundry.utils.mergeObject(super.defaultOptions, settings);
    }

    async close(options = {}) {
        this.onClose.trigger();
        return super.close(options);
    }
}