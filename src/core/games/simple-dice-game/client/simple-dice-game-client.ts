import {SimpleDiceGameApplication} from "../../../../ui/games/simple-dice-game-application";

export default class SimpleDiceGameClient {

    private application: SimpleDiceGameApplication;

    constructor() {
        this.application = new SimpleDiceGameApplication();
    }
    async start() {
        await this.application.render(true);
    }

    async stop() {
        await this.application.close();
    }
}