import GameStateMachine, {GameState} from "../game-state-machine";
import Player from "../player";

class GameInitState implements GameState {
    async onEnter(): Promise<void> {
        console.log('On enter "StartGameState"');
    }

    async onExit(): Promise<void> {
        console.log('On exit "StartGameState"');
    }
}

export default class SimpleDiceGame {

    private stateMachine: GameStateMachine;
    private playersSettings: Player[];

    constructor(playersSettings: Player[]) {
        this.stateMachine = new GameStateMachine();
        this.playersSettings = playersSettings;
    }

    async start() {
        await this.stateMachine.enter(new GameInitState());
    }
}