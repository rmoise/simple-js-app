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

    const someKeys = (object, keys) => keys.some((k) => k in object);
    function add(pokemon) {
        if (someKeys(pokemon, ['name', 'height', 'type'])) {
            pokemonList.push(pokemon);
        } else {
            alert('Pokemon is incorrect');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add('pokedex-button');
        listItem.appendChild(button);
        list.appendChild(listItem);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
