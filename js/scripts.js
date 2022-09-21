let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

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
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add('pokedex-button');
        listItem.appendChild(button);
        list.appendChild(listItem);
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
                item.types = details.types;
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            // Add the new modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.addEventListener('click', hideModal);

            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            let contentElement = document.createElement('p');
            contentElement.innerText = 'Height: ' + pokemon.height;

            let imageElement = document.createElement('img');
            imageElement.setAttribute('src', pokemon.imageUrl);
            imageElement.setAttribute('width', '100');
            imageElement.setAttribute('height', 'auto');
            imageElement.setAttribute('alt', 'Pokemon');

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imageElement);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');
        });
    }
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

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
