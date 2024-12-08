import {modulePath} from "../../contracts";
import {getAttributeData} from "../../utils/dom-utils";

export interface ItemsSelectDialogData {
    title: string;
    submitLabel: string;
    cancelLabel: string;
    items: ItemSelectDialogOption[]
}

export interface ItemSelectDialogOption {
    name: string;
}

export default class ItemSelectDialog<T> {
    private readonly options: ItemsSelectDialogData;

    constructor(options: ItemsSelectDialogData) {
        this.options = options;
    }

    async open(): Promise<T | null> {
        return new Promise(async (resolve) => {
            const content = await renderTemplate(`${modulePath}/templates/dialogs/item-select-dialog.hbs`, { options: this.options.items });

            new Dialog({
                title: this.options.title,
                content,
                buttons: {
                    ok: {
                        label: this.options.submitLabel,
                        callback: (html) => {
                            if (html instanceof HTMLElement) {
                                throw new Error('Expected a jQuery object, but received an HTMLElement. Please ensure the input is a jQuery object.');
                            } else {
                                const element = html.find("#item-select").find(":selected")[0];
                                const index = Number(getAttributeData(element, 'index'));

                                resolve(this.options.items[index] as T);
                            }
                        }
                    },
                    cancel: {
                        label: this.options.cancelLabel,
                        callback: () => resolve(null)
                    }
                },
                default: "ok"
            }).render(true);
        });
    }
}