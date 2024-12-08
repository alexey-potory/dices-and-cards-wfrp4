export interface GameState {
    onEnter() : Promise<void>
    onExit() : Promise<void>
}

export default class GameStateMachine {
    private currenState: GameState | undefined;

    constructor() {
        this.currenState = undefined;
    }

    async enter(state: GameState) {
        if (this.currenState)
            await this.currenState.onExit();

        this.currenState = state;
        await this.currenState.onEnter();
    }
}