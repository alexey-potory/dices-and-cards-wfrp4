import TurnBasedGame from "./turn-based-game";

export class SimpleDiceGame extends TurnBasedGame {
    async _onNextTurn(): Promise<void> {
        await super._onNextTurn();
        console.log('Simple Dice Game');
    }
}