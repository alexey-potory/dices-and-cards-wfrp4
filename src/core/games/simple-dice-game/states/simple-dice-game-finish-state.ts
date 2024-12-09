import GameState from "../../../game-state";

export default class SimpleDiceGameFinishState implements GameState {
    async onEnter(): Promise<void> {
        console.log('On enter "GameCloseState"');
    }

    async onExit(): Promise<void> {
        console.log('On exit "GameCloseState"');
    }
}