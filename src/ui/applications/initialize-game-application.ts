import {modulePath} from "../../contracts";
import {getAttributeData, getDragEventData} from "../../utils/dom-utils";
import PlayerSettingsDialog from "../dialogs/player-settings-dialog";
import {PlayerSettings} from "../../core/settings/player-settings";
import TriggeredEvent = JQuery.TriggeredEvent;
import {getActorOwner} from "../../utils/actor-utils";
import SimpleDiceGame from "../../core/games/simple-dice-game";

interface DragGameData {
    uuid: string;
    type: 'Item' | 'Actor'
}

export class InitializeGameApplication extends Application {

    private readonly playersSettings: PlayerSettings[];

    constructor() {
        super();

        this.playersSettings = [];
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
            playersSettings: this.playersSettings
        };
    }

    activateListeners(html: any) {
        super.activateListeners(html);

        // Drag and drop
        html.find('.players-table-container').on('drop', this._onActorAdd.bind(this));

        // Remove and changing order and settings
        html.find(".actor-btn-up").click(this._onActorOrderUp.bind(this));
        html.find(".actor-btn-down").click(this._onActorOrderDown.bind(this));
        html.find(".actor-btn-remove").click(this._onActorRemove.bind(this));
        html.find(".actor-btn-settings").click(this._onActorSettings.bind(this))

        // Start
        html.find("#start-game-btn").click(this._onStartGame.bind(this))
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

        if (this.playersSettings.find(a => a.actor.uuid === data.uuid)) {
            console.warn('Actor with this UUID already exists in the gameActors list');
            return;
        }

        const document = await fromUuid(data.uuid);

        const actor = document as Actor;
        const owner = getActorOwner(actor);

        if (!owner)
            throw new Error(`Unable to determine owner for the actor with UUID: ${data.uuid}. Ensure that the actor exists and has an associated owner.`);

        const settings = new PlayerSettings(actor, owner);
        this.playersSettings.push(settings);
        this.render(true);
    }

    private async _onActorOrderUp(event: TriggeredEvent) {
        const index = Number(getAttributeData(event.target, 'index'));
        const array = this.playersSettings;

        if (index > 0 && index < array.length) {
            // Swap the current element with the previous one
            [array[index - 1], array[index]] = [array[index], array[index - 1]];
        }

        this.render(true);
    }

    private async _onActorOrderDown(event: TriggeredEvent) {
        const index = Number(getAttributeData(event.target, 'index'));
        const array = this.playersSettings;

        if (index >= 0 && index < array.length - 1) {
            // Swap the current element with the next one
            [array[index], array[index + 1]] = [array[index + 1], array[index]];
        }

        this.render(true);
    }

    private async _onActorRemove(event: TriggeredEvent) {
        const index = Number(getAttributeData(event.target, 'index'));
        const array = this.playersSettings;

        if (index >= 0 && index < array.length) {
            // Remove the element at the given index
            array.splice(index, 1);
        }

        this.render(true);
    }

    private async _onActorSettings(event: TriggeredEvent) {
        const index = Number(getAttributeData(event.target, 'index'));

        const title = this.playersSettings[index].actor.name;
        const dialog = new PlayerSettingsDialog({title: title, submitLabel: 'Save', cancelLabel: 'Cancel' });

        await dialog.open(this.playersSettings[index]);
    }

    private async _onStartGame() {
        await this.close();

        const game = new SimpleDiceGame(this.playersSettings);
        await game.start();
    }
}