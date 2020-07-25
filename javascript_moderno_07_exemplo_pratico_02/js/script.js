/**
 * Estado da aplicação (state)
 */

let allPeople = [];
let findPeople = [];
let find = document.querySelector('#find');
let btnFind = document.querySelector('#btnFind');
let peoples = document.querySelector('#peoples');
let numberFormat = null;

window.addEventListener('load', () => {
    find.addEventListener('keyup', finder);
    btnFind.addEventListener('click', resume);
    numberFormat = Intl.NumberFormat('pt-BR');
    fetchPeople();
});

// async/await
async function fetchPeople() {
    try {
        // await 
        const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
        const dados = await res.json();
        // mapeamento
        allPeople = dados.results.map(dado => {
            // destructuring
            const { name, picture, gender, dob } = dado;
            return {
                name: `${name.first} ${name.last}`,
                gender: gender,
                picture: picture.thumbnail,
                age: dob.age
            };
        });
    } catch (e) {
        console.log('error de conexão: ' + e);

    }
}

// deixei esta função preparada caso não tenha conexão com a API
// function fetchPeople() {
//     try {
//         // mapeamento
//         allPeople = dados.results.map((dado) => {
//             // destructuring
//             const { name, picture, gender, dob } = dado;
//             return {
//                 name: `${name.first} ${name.last}`,
//                 gender: gender,
//                 picture: picture.thumbnail,
//                 age: dob.age
//             };
//         });
//     } catch (e) {
//         console.log('error de conexão: ' + e);
//     }
// }

const finder = (e) => {
    if (e.code == 'Enter') {
        resume(e);
    }
}

const resume = () => {
    if (find.value.length >= 1) {
        findPeople = allPeople.filter(people => {
            return people.name.toLowerCase().indexOf(find.value.toLowerCase()) > -1;
        });
        render();
        sumary();
    }
}

const render = () => {
    peoples.innerHTML = '';
    findPeople.forEach(people => {
        const div = document.createElement('div');
        div.classList.add('people');
        const img = document.createElement('img');
        img.setAttribute('src', people.picture);
        div.appendChild(img);
        const text = document.createTextNode(`${people.name} ${people.age} anos`);
        div.appendChild(text);
        peoples.appendChild(div);
    });
}

const sumary = () => {
    const totalPeople = findPeople.length;
    const titlePeople = document.querySelector('.titlePeople');
    titlePeople.textContent = `${totalPeople} usuário(s) encontrado(s)`;

    const titleStatistic = document.querySelector('.titleStatistic');
    titleStatistic.textContent = 'Estatísticas';

    const totalAge = findPeople.reduce((acumulador, people) => {
        acumulador += people.age;
        return acumulador;
    }, 0);

    const totalMale = findPeople.reduce((acumulador, people) => {
        if (people.gender === 'male') acumulador += 1;
        return acumulador;
    }, 0);

    const totalFemale = findPeople.reduce((acumulador, people) => {
        if (people.gender === 'female') acumulador += 1;
        return acumulador;
    }, 0);

    const statistic = document.querySelector('#statistic');
    const media = formatNumber(totalAge / totalPeople);

    let resume = 'Sexo masculino: <strong>' + totalMale + '</strong> <br />';
    resume += 'Sexo female: <strong>' + totalFemale + '</strong> <br />';
    resume += 'Soma das idades: <strong>' + totalAge + '</strong> <br />';
    resume += 'Média das idades: <strong>' + media + '</strong> <br />';
    statistic.innerHTML = resume;
}

const formatNumber = (number) => {
    return numberFormat.format(number);
}