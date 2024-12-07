import TriggeredEvent = JQuery.TriggeredEvent;

export function getDragEventData<T>(event: DragEvent): T {
    return JSON.parse(event.dataTransfer!.getData('text/plain')) as T;
}

export function getAttributeEventData(ev: TriggeredEvent, propName: string): string {
    let value = ev.target.dataset[propName];

    if (!value) {
        const parent = $(ev.target).parents(`[data-${propName}]`);
        if (parent) {
            value = parent[0]?.dataset[propName];
        }
    }

    return value;
}