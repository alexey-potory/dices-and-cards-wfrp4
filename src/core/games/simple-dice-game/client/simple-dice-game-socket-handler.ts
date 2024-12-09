import {moduleName} from "../../../../contracts";
import SimpleDiceGameSocketMessage from "../simple-dice-game-socket-message";

export default class SimpleDiceGameSocketHandler {
    private socket: io.Socket;

    constructor(socket: io.Socket) {
        this.socket = socket;
        socket.on(`module.${moduleName}`, async message => await this._onSocketMessage(message))
    }

    emit(message: SimpleDiceGameSocketMessage) {
        this.socket.emit(`module.${moduleName}`, message);
    }

    private async _onSocketMessage(message: SimpleDiceGameSocketMessage) {
        console.log('SOCKET_MESSAGE', message);

        if (!message.source ||
            message.source !== 'SIMPLE_DICE_GAME')
            return;

        if (message.users && !message.users.find(id => id === game.user?.id)) {
            console.log('USER_NOT_FOUND_IN_USERS');
            return;
        }

        if (message.action === 'START_GAME') {
            const client = game.dicesAndCards?.games.simpleDiceGame.client!;
            await client.stop()

            console.log('STARTING_NEW_CLIENT');
            await client.start();
        }
    }

}