window.addEventListener('load', () => {
    // executeDivisionPromise(12, 6);
    // executeDivisionPromiseAsyncAwait(50, 5);
    // executeDivisionPromiseAsyncAwait(50, 0);
    dadosGitHub();
});

async function dadosGitHub() {
    try {
        const github = await fetch('https://apii.github.com/users/cleberemail');
        const dados = await github.json();
        showData(dados);
    } catch (e) {
        console.log('error de conexão: ' + e);
    }
}

const showData = (data) => {
    var div = document.querySelector('#result');
    var ul = document.createElement('ul');
    for (var indice in data) {
        var li = document.createElement('li');
        var text = document.createTextNode(`${indice} ---- ${data[indice]}`);
        li.appendChild(text);
        ul.appendChild(li);
    }
    var div = document.querySelector('#result');
    div.appendChild(ul);
}

const divisionPromise = (a, b) => {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject('Não é possivel dividir por zero');
        }
        resolve(a / b);
    });
}

const executeDivisionPromise = (a, b) => {
    divisionPromise(a, b)
        .then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
}

async function executeDivisionPromiseAsyncAwait(a, b) {
    const division = await divisionPromise(a, b);
    console.log(division);
}