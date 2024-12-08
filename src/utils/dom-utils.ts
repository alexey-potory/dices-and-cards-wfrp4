import TriggeredEvent = JQuery.TriggeredEvent;

export function getDragEventData<T>(event: DragEvent): T {
    return JSON.parse(event.dataTransfer!.getData('text/plain')) as T;
}

export function getAttributeData(element: any, propName: string): string {
    let value = element.dataset[propName];

    if (!value) {
        const parent = $(element).parents(`[data-${propName}]`);
        if (parent) {
            value = parent[0]?.dataset[propName];
        }
    }

    return value;
}