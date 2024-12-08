import GameStateMachine, {GameState} from "../game-state-machine";
import Player from "../player";

class GameInitState implements GameState {
    async onEnter(): Promise<void> {
        console.log('On enter "GameInitState"');
    }

    async onExit(): Promise<void> {
        console.log('On exit "GameInitState"');
    }
}

class GameFinishState implements GameState {
    async onEnter(): Promise<void> {
        console.log('On enter "GameCloseState"');
    }

    async onExit(): Promise<void> {
        console.log('On exit "GameCloseState"');
    }
}

export default class SimpleDiceGame {

    private stateMachine: GameStateMachine;
    private players: Player[];

    constructor(players: Player[]) {
        this.stateMachine = new GameStateMachine();
        this.players = players;
    }

    async start() {
        await this.stateMachine.enter(new GameInitState());
    }

    async stop() {
        await this.stateMachine.enter(new GameFinishState());
    }
}