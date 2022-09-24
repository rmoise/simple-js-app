let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Other functions remain here

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is incorrect');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('list-group-item');
        button.innerText = pokemon.name;
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        button.classList.add('btn', 'button');
        listItem.appendChild(button);
        list.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showLoadingMessage() {
        let loading = document.createElement('div');
        loading.classList.add('loading');
        loading.textContent = 'loading...';
        document.body.appendChild(loading);
    }

    function hideLoadingMessage() {
        const element = document.querySelector('.loading');
        element.remove();
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                hideLoadingMessage();
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                hideLoadingMessage();
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types.map((type) => type.type.name).join(', ');
                item.weight = details.weight;
                item.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let modalBody = $('.modal-body');
            let modalTitle = $('.modal-title');

            modalTitle.empty();
            modalBody.empty();

            // creating element for name in modal content
            let nameElement = $('<h1>' + pokemon.name + '</h1>');

            // creating img in modal content
            let imageElementFront = $('<img class="modal-img" style="width:30%">');
            imageElementFront.attr('src', pokemon.imageUrl);

            // creating element for height in modal content
            let heightElement = $('<p>' + '<b>Height</b> ' + '\xa0\xa0\xa0\xa0\xa0\xa0' + pokemon.height + '</p>');
            // creating element for weight in modal content
            let weightElement = $('<p>' + '<b>Weight</b> ' + '\xa0\xa0\xa0\xa0\xa0' + pokemon.weight + '</p>');
            // creating element for type in modal content
            let typesElement = $('<p>' + '<b>Types</b> ' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + pokemon.types + '</p>');
            // creating element for abilities in modal content
            let abilitiesElement = $('<p>' + '<b>Abilities</b> ' + '\xa0\xa0\xa0' + pokemon.abilities + '</p>');

            modalTitle.append(nameElement);
            modalBody.append(imageElementFront);
            modalBody.append(heightElement);
            modalBody.append(weightElement);
            modalBody.append(typesElement);
            modalBody.append(abilitiesElement);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
