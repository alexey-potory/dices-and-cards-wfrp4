import Player from "../../player";

export default interface SimpleDiceGameTurn {
    player: Player;
    target: Number;
}