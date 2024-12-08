import {PlayerBalance} from "../player-balance";

export class PlayerSettings {
    public readonly actor: Actor;
    public readonly balance: PlayerBalance = new PlayerBalance(0, 0, 0);

    public owner: User;

    constructor(actor: Actor, owner: User) {
        this.actor = actor;
        this.owner = owner;
    }
}