import {PlayerBalance} from "./player-balance";

export default class Player {
    private _user: User;
    private _balance: PlayerBalance;

    constructor(user: User, balance: PlayerBalance) {
        this._user = user;
        this._balance = balance;
    }

    // Method to require a move from the player
    requireMove(): void {
        // TODO: Implement logic to require a move from the player
        // Possibly involve waiting for input or other game logic
    }
}