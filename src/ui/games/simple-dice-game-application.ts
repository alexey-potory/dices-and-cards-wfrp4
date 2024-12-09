import {modulePath} from "../../contracts";
import {LiteEvent} from "../../core/events/lite-event";
import {SimpleDiceGameClientState} from "../../core/games/simple-dice-game/client/simple-dice-game-client-state";
import SimpleDiceGameTurn from "../../core/games/simple-dice-game/simple-dice-game-turn";

export class SimpleDiceGameApplication extends Application {
    private readonly onClose = new LiteEvent<void>();

    private state?: SimpleDiceGameClientState;
    private turn?: SimpleDiceGameTurn;

    public get Closed() { return this.onClose.expose() }

    constructor(options = {}) {
        super();
    }

    getData(options:any) {
        //if (!this.turn || !this.state) {
        //    throw new Error('Invalid state: Either "state" or "turn" is undefined. Ensure the game is initialized and a turn is in progress before calling getData.');
        //}

        return {
            actors: game.actors?.contents!
        };
    }

    setTurn(turn: SimpleDiceGameTurn) {
        this.turn = turn;
        this.render(true);
    }

    setState(state: SimpleDiceGameClientState) {
        this.state = state;
        this.render(true);
    }

    static get defaultOptions() {

        const templatePath =
            `${modulePath}/templates/games/simple-dice-game-application.hbs`;

        const startWidth = 650;
        const startHeight = 500;

        const settings = {
            title: 'Simple Dice Game',
            template: templatePath,
            width: startWidth,
            height: startHeight,
            resizable: true,
            classes: [
                'simple-dice-game-application'
            ]
        };

        return foundry.utils.mergeObject(super.defaultOptions, settings);
    }

    async close(options = {}) {
        this.onClose.trigger();
        return super.close(options);
    }
}