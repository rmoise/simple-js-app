/* Wraps the pokemonList array in IIFE. Adds a new variable to hold what IIFE will retun and assign the IIFE to that variable */
let pokemonRepository = (function () {
    /* Adds an array of 4 Pokemons (objects), which contains a list of Pokemons */
    let pokemonList = [];

    /* Loads the list of 10 Pokemons from an external link */
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    /* This function adds new single item to the pokemonList array */
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is incorrect');
        }
    }

    // This function returns the pokemonList array
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        // Selects elements with the list-group class
        let list = document.querySelector('.pokemon-list');
        // Creates a li tag
        let listItem = document.createElement('li');
        // Adds classes for the li tag
        listItem.classList.add('list-group-item');

        // Creates a button
        let button = document.createElement('button');
        // Adds classes for the button tag
        button.classList.add('btn', 'button');
        // Adds the names from pokemonList array on the button
        button.innerText = pokemon.name;
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');

        //Appends the button and the list to their parents
        listItem.appendChild(button);
        list.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    // Shows loading message
    function showLoadingMessage() {
        let loading = document.createElement('div');
        loading.classList.add('loading');
        loading.textContent = 'loading...';
        document.body.appendChild(loading);
    }

    // Hides loading message
    function hideLoadingMessage() {
        const element = document.querySelector('.loading');
        element.remove();
    }

    // Fetches data from the API, then add each Pokémon in the fetched data to pokemonList
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

    // Loads for each Pokemon (item) the detailed data from the API
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                hideLoadingMessage();
                // Adds the details to the items
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

    // Runs a console.log on the Pokemon objects to show details
    function showDetails(pokemon) {
        // Executes loadDetails function (that gets the Pokemon’s details from the server) in showDetails function (that is executed when a user clicks on a Pokemon button)
        loadDetails(pokemon).then(function () {
            // Selects the classes, assigns it to a variable
            let modalBody = $('.modal-body');
            let modalTitle = $('.modal-title');

            // Empty the modalTitle and modalBody to avoid overlapping and adding content.
            modalTitle.empty();
            modalBody.empty();

            // Selects details about Pokemon that will be displayed in Modal.
            let nameElement = $('<h1>' + pokemon.name + '</h1>');
            let imageElementFront = $('<img class="modal-img" style="width:30%">');
            imageElementFront.attr('src', pokemon.imageUrl);
            let heightElement = $('<p>' + '<b>Height</b> ' + '\xa0\xa0\xa0\xa0\xa0\xa0' + pokemon.height + '</p>');
            let weightElement = $('<p>' + '<b>Weight</b> ' + '\xa0\xa0\xa0\xa0\xa0' + pokemon.weight + '</p>');
            let typesElement = $('<p>' + '<b>Types</b> ' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + pokemon.types + '</p>');
            let abilitiesElement = $('<p>' + '<b>Abilities</b> ' + '\xa0\xa0\xa0' + pokemon.abilities + '</p>');

            // Appends to their parents
            modalTitle.append(nameElement);
            modalBody.append(imageElementFront);
            modalBody.append(heightElement);
            modalBody.append(weightElement);
            modalBody.append(typesElement);
            modalBody.append(abilitiesElement);
        });
    }

    // Adds the search by name functionality for the Search Bar.
    let searchBar = document.querySelector('#search-bar');
    searchBar.addEventListener('input', function (event) {
        let pokemonList = document.querySelectorAll('.list-group-item');
        let filterUpperCase = searchBar.value.toUpperCase();
        let showError = true;

        pokemonList.forEach(function (pokemon) {
            if (pokemon.innerText.toUpperCase().indexOf(filterUpperCase) > -1) {
                pokemon.style.display = '';
                showError = false;
            } else {
                // makes element invisible and hides error message
                pokemon.style.display = 'none';
                $('.error').hide();
            }
            showError ? $('.error').show() : $('.error').hide();
        });
    });

    // On enter hides the navbar
    $(document).bind('keypress', function (e) {
        // If the user presses the "Enter" key on the keyboard
        if (e.keyCode == 13) {
            // do something
            e.preventDefault();
            let $navbar = $('.navbar-collapse');
            $navbar.collapse('hide');
            // Hides keyboard in iphone safari webapp
            $('#search-bar').blur();
        }
    });
    // On click hides the navbar. It reads if .navbar-collapse has the word show in classes (which means menu is opened) and hides the navbar when you click/tap anywhere.
    $(document).click(function (event) {
        if ($(event.target).parents('.navbar-collapse').length < 1) {
            let clickover = $(event.target);
            let $navbar = $('.navbar-collapse');
            let _opened = $navbar.hasClass('show');
            if (_opened === true && !clickover.hasClass('navbar-toggle')) {
                $navbar.collapse('hide');
            }
        }
    });

    // Defines the keywords for the function that are used for execution outside of IIFE
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// Fetches each Pokemon from the API using forEach loop
pokemonRepository.loadList().then(function () {
    // Using forEach function instead of using the for loop to iterate over the Pokemons in pokemonList array in order to print the details of each one*
    // Chains the forEach function at getALL (IIFE) function
    // Use the addListItem function inside your forEach() loop to create a button for each Pokémon in the array
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
