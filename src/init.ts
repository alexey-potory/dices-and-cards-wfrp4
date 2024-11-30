Hooks.on('ready', () => {
    const users = game.users?.contents as User[];
    const actors = game.actors?.contents as Actor[];
    actors.map(actor => actor.system.details.age.value);

    const characters = users.filter(user => user.active && !user.isGM).map(user => user.character);

    console.log(characters);
});