import SimpleDiceGameSocketMessage from "../simple-dice-game-socket-message";
import SimpleDiceGameSocketHandler from "../client/simple-dice-game-socket-handler";
import GameState from "../../../game-state";

export default class SimpleDiceGameInitState implements GameState {
    private socketHandler: SimpleDiceGameSocketHandler;
    private users: User[];

    constructor(socketHandler: SimpleDiceGameSocketHandler, users: User[]) {
        this.socketHandler = socketHandler;
        this.users = users;
    }

    async onEnter(): Promise<void> {
        const message: SimpleDiceGameSocketMessage = {
            source: 'SIMPLE_DICE_GAME',
            action: 'START_GAME',
            users: this.users.map(user => user.id!)
        };

        this.socketHandler.emit(message);
        console.log('Initialization complete', message);
    }

    async onExit(): Promise<void> {}
}