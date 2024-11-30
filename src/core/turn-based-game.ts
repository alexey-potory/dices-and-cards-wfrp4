export enum GameState {
    NotStarted = 0,
    Playing = 1,
    BetweenRounds = 2
}

export default class AlZahrGame {

    private _actors: Actor[];
    private _currentActorIndex: number;

    public _gameState: GameState = GameState.NotStarted;

    constructor(actors: Actor[]) {
        this._actors = actors;
        this._currentActorIndex = 0;
    }

    addActor(actor: Actor) {
        if (this._gameState === GameState.Playing) {
            ui.notifications?.warn(`The game is already in progress. Please wait until the current session ends.`);
            return;
        }

        this._actors.push(actor);
    }

    removeActor(actor: Actor) {
        if (this._gameState === GameState.Playing) {
            ui.notifications?.warn(`The game is already in progress. Please wait until the current session ends.`);
            return;
        }

        this._actors.splice(this._actors.indexOf(actor), 1);
    }

    nextTurn() {
        if (this._gameState !== GameState.Playing) {
            ui.notifications?.warn(`The game has not started yet. Please start the game to proceed to the next turn.`);
            return;
        }

        this._currentActorIndex++;
        this._currentActorIndex %= this._actors.length;
    }
}