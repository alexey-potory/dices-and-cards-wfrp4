import TurnBasedGame from "./turn-based-game";

export class AlZahrGame extends TurnBasedGame {
    async _onNextTurn(): Promise<void> {
        await super._onNextTurn();
        console.log('Al Zahr Game');
    }
}