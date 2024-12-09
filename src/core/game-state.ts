export default interface GameState {
    onEnter(): Promise<void>
    onExit(): Promise<void>
}