let pokemonList = [
    {
        name: 'Pikachu',
        height: 0.4,
        type: ['electric'],
    },
    {
        name: 'Squirtle',
        height: 0.5,
        type: ['water'],
    },
    {
        name: 'Charizard',
        height: 1.7,
        type: ['fire', 'flying'],
    },
]
/* A for loop:
the initialization, or starting point (let i = 0)
the condition (i <= 100)
the action (i++)
*/
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.0) {
        document.write(pokemonList[i].name + ` (height: ${pokemonList[i].height})` + " - Wow, that's big!")
    } else {
        /* pokemonList[i].name:
        meaning give me the pokemon list name at position i, position i being 0, then 1, then 2 until the last object in the array
        Template literal form aka Template Strings:
        This is what a template literal form looks like: `hi ${message}` allows you to write anything between the backtick symbols.
        */
        document.write(pokemonList[i].name + ` (height: ${pokemonList[i].height})` + '<br>')
    }
}
