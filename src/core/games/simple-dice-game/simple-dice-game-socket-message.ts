export default interface SimpleDiceGameSocketMessage {
    source: 'SIMPLE_DICE_GAME';
    users?: string[];
    action: 'START_GAME';
}