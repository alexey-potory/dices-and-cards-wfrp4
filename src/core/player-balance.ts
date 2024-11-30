export interface BalanceOffset {
    gold: number;
    silver: number;
    copper: number;
}

export class PlayerBalance {
    private _gold: number;
    private _silver: number;
    private _copper: number;

    // Conversion constants
    private static GOLD_TO_SILVER = 100;
    private static SILVER_TO_COPPER = 100;

    constructor(gold: number, silver: number, copper: number) {
        this._gold = gold;
        this._silver = silver;
        this._copper = copper;
    }


    // Method to get the balance in Gold, Silver, Copper format (just for display or debugging)
    getBalance(): { gold: number, silver: number, copper: number } {
        return {gold: this._gold, silver: this._silver, copper: this._copper};
    }

    hasEnough(offset: BalanceOffset): boolean {
        let currentCopper = this._toCopper(); // Get the current balance in copper
        const valueInCopper = this._copperFromOffset(offset);

        // Check if the balance is sufficient
        return currentCopper >= valueInCopper;
    }

    subtract(offset: BalanceOffset): void {
        let currentCopper = this._toCopper(); // Get the current balance in copper
        const valueInCopper = this._copperFromOffset(offset);

        // Check if the balance is sufficient, and subtract
        if (currentCopper >= valueInCopper) {
            currentCopper -= valueInCopper;
            this._fromCopper(currentCopper); // Update the balance
        } else {
            throw new Error("Insufficient balance");
        }
    }

    private _copperFromOffset(offset: BalanceOffset): number {
        let valueInCopper = 0;

        // Convert the gold and silver amounts to copper and add them up
        if (offset.gold) {
            valueInCopper += offset.gold * PlayerBalance.GOLD_TO_SILVER * PlayerBalance.SILVER_TO_COPPER;
        }
        if (offset.silver) {
            valueInCopper += offset.silver * PlayerBalance.SILVER_TO_COPPER;
        }
        if (offset.copper) {
            valueInCopper += offset.copper;
        }

        return valueInCopper;
    }

    // Helper method to convert all currencies to copper
    private _toCopper(): number {
        return this._gold * PlayerBalance.GOLD_TO_SILVER * PlayerBalance.SILVER_TO_COPPER +
            this._silver * PlayerBalance.SILVER_TO_COPPER +
            this._copper;
    }

    // Helper method to convert copper back to gold, silver, and copper
    private _fromCopper(copper: number): void {
        this._gold = Math.floor(copper / (PlayerBalance.GOLD_TO_SILVER * PlayerBalance.SILVER_TO_COPPER));
        copper %= (PlayerBalance.GOLD_TO_SILVER * PlayerBalance.SILVER_TO_COPPER);

        this._silver = Math.floor(copper / PlayerBalance.SILVER_TO_COPPER);
        copper %= PlayerBalance.SILVER_TO_COPPER;

        this._copper = copper;
    }
}