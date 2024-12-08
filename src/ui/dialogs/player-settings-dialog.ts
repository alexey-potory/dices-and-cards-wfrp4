import {modulePath} from "../../contracts";
import {PlayerSettings} from "../../core/settings/player-settings";
import {arrayToSelectObject} from "../../utils/game-object-utils";

export interface PlayerSettingsDialogSettings {
    title: string;
    submitLabel: string;
    cancelLabel: string;
}

export default class PlayerSettingsDialog {
    private readonly settings: PlayerSettingsDialogSettings;
    private options!: PlayerSettings;

    constructor(options: PlayerSettingsDialogSettings) {
        this.settings = options;
    }

    async open(options: PlayerSettings): Promise<PlayerSettings> {
        this.options = options;

        return new Promise(async (resolve) => {

            const users = game.users?.contents;

            if (!users)
                return;

            const usersList = arrayToSelectObject(users);

            const content = await renderTemplate(`${modulePath}/templates/dialogs/player-settings-dialog.hbs`, {
                ...this.options,
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

                                options.balance.setBalance(gold, silver, copper);
                                options.owner = game.users?.find(u => u.id === ownerId) as User;

                                return this.options;
                            }
                        }
                    },
                    cancel: {
                        label: this.settings.cancelLabel,
                        callback: () => resolve(this.options)
                    }
                },
                default: "ok"
            }).render(true);
        });
    }
}