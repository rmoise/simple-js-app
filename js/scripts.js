//@ts-check
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Pikachu',
            height: 0.4,
            type: ['electric']
        },
        {
            name: 'Squirtle',
            height: 0.5,
            type: ['water']
        },
        {
            name: 'Charizard',
            height: 1.7,
            type: ['fire', 'flying']
        }
    ];

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            alert('Pokemon is incorrect');
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 1.0) {
        document.write(pokemon.name + ` (height: ${pokemon.height})` + " - Wow, that's big!");
    } else {
        document.write(pokemon.name + ` (height: ${pokemon.height})` + '<br>');
    }
});

console.log(pokemonRepository.getAll());
