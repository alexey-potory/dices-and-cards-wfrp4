import GameStateMachine, {GameState} from "../game-state-machine";
import {PlayerSettings} from "../settings/player-settings";

class StartGameState implements GameState {
    async onEnter(): Promise<void> {
        console.log('On enter "StartGameState"');
    }

    async onExit(): Promise<void> {
        console.log('On exit "StartGameState"');
    }
}

export default class SimpleDiceGame {

    private stateMachine: GameStateMachine;
    private playersSettings: PlayerSettings[];

    constructor(playersSettings: PlayerSettings[]) {
        this.stateMachine = new GameStateMachine();
        this.playersSettings = playersSettings;
    }

    async start() {
        await this.stateMachine.enter(new StartGameState());
    }
}