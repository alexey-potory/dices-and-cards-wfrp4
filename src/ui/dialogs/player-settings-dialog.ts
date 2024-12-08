import {modulePath} from "../../contracts";
import {arrayToSelectObject} from "../../utils/game-object-utils";
import Player from "../../core/player";

export interface PlayerSettingsDialogSettings {
    title: string;
    submitLabel: string;
    cancelLabel: string;
}

export default class PlayerSettingsDialog {
    private readonly settings: PlayerSettingsDialogSettings;
    private player!: Player;

    constructor(options: PlayerSettingsDialogSettings) {
        this.settings = options;
    }

    async open(player: Player): Promise<Player> {
        this.player = player;

        return new Promise(async (resolve) => {

            const users = game.users?.contents;

            if (!users)
                return;

            const usersList = arrayToSelectObject(users);

            const content = await renderTemplate(`${modulePath}/templates/dialogs/player-settings-dialog.hbs`, {
                ...this.player,
                users: usersList
            });

            new Dialog({
                title: this.settings.title,
                content,
                buttons: {
                    ok: {
                        label: this.settings.submitLabel,
                        callback: (html) => {
                            if (html instanceof HTMLElement) {
                                throw new Error('Expected a jQuery object, but received an HTMLElement. Please ensure the input is a jQuery object.');
                            } else {
                                const gold = Number(html.find("#gold-input").val());
                                const silver= Number(html.find("#silver-input").val());
                                const copper = Number(html.find("#copper-input").val());

                                const ownerId = html.find("#owner-select").val()

                                player.balance.setBalance(gold, silver, copper);
                                player.owner = game.users?.find(u => u.id === ownerId) as User;

                                return this.player;
                            }
                        }
                    },
                    cancel: {
                        label: this.settings.cancelLabel,
                        callback: () => resolve(this.player)
                    }
                },
                default: "ok"
            }).render(true);
        });
    }
}