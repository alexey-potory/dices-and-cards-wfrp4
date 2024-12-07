import {modulePath} from "../../contracts";
import TriggeredEvent = JQuery.TriggeredEvent;
import {getAttributeEventData, getDragEventData} from "../../utils/dom-utils";

interface DragGameData {
    uuid: string;
    type: 'Item' | 'Actor'
}

export class InitializeGameApplication extends Application {

    private readonly gameActors: Actor[];

    constructor() {
        super();

        this.gameActors = [];
    }

    static get defaultOptions() {

        const templatePath =
            `${modulePath}/templates/applications/initialize-game-application.hbs`;

        const startWidth = 650;
        const startHeight = 500;

        const settings = {
            title: 'Initialize game',
            template: templatePath,
            width: startWidth,
            height: startHeight,
            resizable: true,
            classes: [
                'initialize-game-application'
            ]
        };

        return foundry.utils.mergeObject(super.defaultOptions, settings);
    }

    getData(options:any) {
        return {
            actors: this.gameActors
        };
    }

    activateListeners(html: any) {
        super.activateListeners(html);

        // Drag and drop
        html.find('.players-table-container').on('drop', this._onActorAdd.bind(this));

        // Remove and changing order
        html.find(".actor-btn-up").click(this._onActorOrderUp.bind(this));
        html.find(".actor-btn-down").click(this._onActorOrderDown.bind(this));
        html.find(".actor-btn-remove").click(this._onActorRemove.bind(this));
    }

    private async _onActorAdd(event: TriggeredEvent) {
        event.preventDefault();

        const originalEvent = event.originalEvent as DragEvent;

        if (!originalEvent) {
            return;
        }

        const data = getDragEventData<DragGameData>(originalEvent);

        if (!data.type || data.type !== 'Actor') {
            console.warn('Invalid data type: expected "Actor"');
            return;
        }

        if (this.gameActors.find(a => a.uuid === data.uuid)) {
            console.warn('Actor with this UUID already exists in the gameActors list');
            return;
        }

        const document = await fromUuid(data.uuid);
        const actor = document as Actor;

        this.gameActors.push(actor);
        this.render(true);
    }

    private async _onActorOrderUp(event: TriggeredEvent) {
        const index = Number(getAttributeEventData(event, 'index'));
        const array = this.gameActors;

        if (index > 0 && index < array.length) {
            // Swap the current element with the previous one
            [array[index - 1], array[index]] = [array[index], array[index - 1]];
        }

        this.render(true);
    }

    private async _onActorOrderDown(event: TriggeredEvent) {
        const index = Number(getAttributeEventData(event, 'index'));
        const array = this.gameActors;

        if (index >= 0 && index < array.length - 1) {
            // Swap the current element with the next one
            [array[index], array[index + 1]] = [array[index + 1], array[index]];
        }

        this.render(true);
    }

    private async _onActorRemove(event: TriggeredEvent) {
        const index = Number(getAttributeEventData(event, 'index'));
        const array = this.gameActors;

        if (index >= 0 && index < array.length) {
            // Remove the element at the given index
            array.splice(index, 1);
        }

        this.render(true);
    }
}