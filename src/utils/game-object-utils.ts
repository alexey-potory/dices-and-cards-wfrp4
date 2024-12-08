export function arrayToSelectObject(arr: {id: string; name:string}[]): Record<string, string> {
    return arr.reduce((acc, obj) => {
        acc[obj.id] = obj.name;
        return acc;
    }, {} as Record<string, string>);
}