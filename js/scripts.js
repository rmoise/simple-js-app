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

pokemonList.forEach(function (pokemon) {
    if (pokemon.height > 1.0) {
        document.write(pokemon.name + ` (height: ${pokemon.height})` + " - Wow, that's big!")
    } else {
        document.write(pokemon.name + ` (height: ${pokemon.height})` + '<br>')
    }
})
