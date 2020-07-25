/**
 * Estado da aplicação (state)
 */

let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoritesCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
    tabCountries = document.querySelector('#tabCountries');
    tabFavorites = document.querySelector('#tabFavorites');

    countCountries = document.querySelector('#countCountries');
    countFavorites = document.querySelector('#countFavorites');

    totalPopulationList = document.querySelector('#totalPopulationList');
    totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

    totalCountriesList = 0;
    totalCountriesFavorites = 0;

    numberFormat = Intl.NumberFormat('pt-BR');

    fetchCountries();
});

// async/await
async function fetchCountries() {
    try {
        // await 
        const res = await fetch('https://restcountries.eu/rest/v2/all');
        const dados = await res.json();
        // mapeamento dosdados
        allCountries = dados.map(dado => {
            /** 
             * destruction em ação » ({a, b} = {a:1, b:2});
             * console.log(a); // 1
             * console.log(b); // 2
            */
            const { numericCode, translations, population, flag } = dado;
            return {
                id: numericCode,
                name: translations.pt,
                population: population,
                formattedPopulation: formatNumber(population),
                flag: flag
            };
        });
        render();
    } catch (e) {
        console.log('error de conexão: ' + e);
    }
}

const render = () => {
    renderCountryList();
    renderFavorites();
    renderSummary();
    handleCountryButtons();
}

const renderCountryList = () => {
    tabCountries.innerHTML = '';
    allCountries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    }).forEach(dado => {
        // destruction, basicamento cria as variavés poupando serviço para o programador
        const { id, name, population, flag, formattedPopulation } = dado;

        // criando elemento flag
        const imgFlag = document.createElement('img');
        imgFlag.setAttribute('src', flag);

        // criando elemento button
        const btnAdd = document.createElement('button');
        btnAdd.setAttribute('id', id);
        btnAdd.classList.add('btn');
        btnAdd.classList.add('waves-effect');
        btnAdd.classList.add('waves-light');
        const textAdd = document.createTextNode('+');
        btnAdd.appendChild(textAdd);

        // criando elemento div text
        const ulInformation = document.createElement('ul');
        const liName = document.createElement('li');
        const textName = document.createTextNode(name)
        liName.appendChild(textName);
        ulInformation.appendChild(liName);
        const liPopulation = document.createElement('li');
        const textPopulation = document.createTextNode(formattedPopulation);
        liPopulation.appendChild(textPopulation);
        ulInformation.appendChild(liPopulation);

        // criando a div filha
        const div = document.createElement('div');
        div.classList.add('country');
        div.appendChild(btnAdd);
        div.appendChild(imgFlag);
        div.appendChild(ulInformation);

        // adicioando a div filha na tab
        tabCountries.appendChild(div);
    });
}

const renderFavorites = () => {
    tabFavorites.innerHTML = '';
    favoritesCountries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    }).forEach(dado => {
        // destruction, basicamento cria as variavés poupando serviço para o programador
        const { id, name, population, flag, formattedPopulation } = dado;

        // criando elemento flag
        const imgFlag = document.createElement('img');
        imgFlag.setAttribute('src', flag);

        // criando elemento button
        const btnAdd = document.createElement('button');
        btnAdd.setAttribute('id', id);
        btnAdd.classList.add('btn');
        btnAdd.classList.add('waves-effect');
        btnAdd.classList.add('waves-light');
        btnAdd.classList.add('red');
        btnAdd.classList.add('darken-4');
        const textAdd = document.createTextNode('-');
        btnAdd.appendChild(textAdd);

        // criando elemento div text
        const ulInformation = document.createElement('ul');
        const liName = document.createElement('li');
        const textName = document.createTextNode(name)
        liName.appendChild(textName);
        ulInformation.appendChild(liName);
        const liPopulation = document.createElement('li');
        const textPopulation = document.createTextNode(formattedPopulation);
        liPopulation.appendChild(textPopulation);
        ulInformation.appendChild(liPopulation);

        // criando a div filha
        const div = document.createElement('div');
        div.classList.add('country');
        div.appendChild(btnAdd);
        div.appendChild(imgFlag);
        div.appendChild(ulInformation);

        // adicioando a div filha na tab
        tabFavorites.appendChild(div);
    });
}

const renderSummary = () => {

    // utilizando redduce para contar quantos elementos tem um array
    // countCountries.textContent = allCountries.reduce((acc, _) => {
    //     acc++;
    //     return acc;
    // }, 0);

    countCountries.textContent = allCountries.length;
    countFavorites.textContent = favoritesCountries.length;

    // utilizando redduce para calcular a população
    const totalPopulationCountries = allCountries.reduce((acumulador, dado) => {
        acumulador += dado.population;
        return acumulador;
    }, 0);
    totalPopulationList.textContent = formatNumber(totalPopulationCountries);

    const totalPopulationFavorities = favoritesCountries.reduce((acumulador, dado) => {
        acumulador += dado.population;
        return acumulador;
    }, 0);
    totalPopulationFavorites.textContent = formatNumber(totalPopulationFavorities);

}

const handleCountryButtons = () => {
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
    const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
    countryButtons.forEach(button => {
        button.addEventListener('click', () => {
            addFavorites(button.id);
        });
    });
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            remFavorites(button.id);
        });
    });
}

const addFavorites = (id) => {
    const countryToAdd = allCountries.find(country => {
        return country.id === id;
    });
    favoritesCountries = [...favoritesCountries, countryToAdd];
    allCountries = allCountries.filter(country => {
        return country.id !== id;
    });
    render();
}

const remFavorites = (id) => {
    const countryToRemove = favoritesCountries.find(country => {
        return country.id === id;
    });
    favoritesCountries = favoritesCountries.filter(country => country.id !== id);
    allCountries = [...allCountries, countryToRemove];
    render();
}

const formatNumber = (number) => {
    return numberFormat.format(number);
}