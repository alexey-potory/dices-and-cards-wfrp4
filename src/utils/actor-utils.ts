export function getActorOwner(actor: Actor) : User | null {
    const userOwners = game.users?.contents
        .filter(user => !user.isGM && actor.testUserPermission(user, 'OWNER'));

    if (!userOwners)
        return null;

    if (userOwners.length > 0)
        return userOwners[0];

    const activeGM = game.users?.activeGM;

    if (!activeGM)
        return null;

    return activeGM;
}