
import SimpleDiceGameClient from "./core/games/simple-dice-game/client/simple-dice-game-client";
import SimpleDiceGameCore from "./core/games/simple-dice-game/simple-dice-game-core";

export const moduleName = "dices-and-cards-wfrp4";
export const modulePath = `modules/${moduleName}`

export interface ModuleRoot {
    games: {
        simpleDiceGame: {
            core: SimpleDiceGameCore,
            client: SimpleDiceGameClient
        }
    }
}

export class Contracts {
    static get root() : ModuleRoot {
        // @ts-ignore
        return game.dicesAndCards;
    }

    static set root(root: ModuleRoot) {
        // @ts-ignore
        game.dicesAndCards = root;
    }
}