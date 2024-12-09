import Player from "../../player";
import GameStateMachine from "../../game-state-machine";
import SimpleDiceGameSocketHandler from "./client/simple-dice-game-socket-handler";
import SimpleDiceGameFinishState from "./states/simple-dice-game-finish-state";
import SimpleDiceGameInitState from "./states/simple-dice-game-init-state";

export default class SimpleDiceGameCore {

    private readonly socketHandler: SimpleDiceGameSocketHandler;
    private stateMachine!: GameStateMachine;

    private players!: Player[];
    private users!: User[];

    constructor() {
        const socket = game.socket;

        if (!socket) {
            throw new Error('Socket is undefined. Ensure the game is properly initialized with a valid socket connection.');
        }

        this.socketHandler = new SimpleDiceGameSocketHandler(socket);
    }

    async start(players: Player[]) {
        if (!game.user?.isGM) {
            throw new Error('Only the Game Master (GM) can start the game.');
        }

        if (this.stateMachine)
            await this.stateMachine.enter(new SimpleDiceGameFinishState());
        else
            this.stateMachine = new GameStateMachine();

        this.players = players;
        this.users = Array.from(new Set(this.players.map(player => player.owner)));

        await this.stateMachine.enter(new SimpleDiceGameInitState(this.socketHandler, this.users));
    }

    async stop() {
        if (!game.user?.isGM) {
            throw new Error('Only the Game Master (GM) can stop the game.');
        }

        await this.stateMachine.enter(new SimpleDiceGameFinishState());
    }
}