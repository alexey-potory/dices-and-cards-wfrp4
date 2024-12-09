import GameState from "./game-state";

export default class GameStateMachine {
    private currenState: GameState | undefined;

    async enter(state: GameState) {
        if (this.currenState)
            await this.currenState.onExit();

        this.currenState = state;
        await this.currenState.onEnter();
    }
}