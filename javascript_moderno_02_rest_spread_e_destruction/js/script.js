window.addEventListener('load', () => {
    let btn1 = document.querySelector('#btn1');
    let btn2 = document.querySelector('#btn2');
    let btn3 = document.querySelector('#btn3');
    btn1.addEventListener('click', usandoSpread);
    btn2.addEventListener('click', usandoRest);
    btn3.addEventListener('click', usandoDestructuring);
});

const usandoSpread = () => {

    // array de objeto pessoas acima ou igual a 70 anos
    const pessoas_70 = people.results.filter((pessoa) => {
        return pessoa.dob.age >= 70;
    });

    // array de objeto pessoas entre 40 e 49 anos
    const pessoas_40 = people.results.filter((pessoa) => {
        return (pessoa.dob.age >= 40 && pessoa.dob.age < 50);
    });

    // const pessoas = [...pessoas_40, pessoas_70];

    // unifico os dois arrays de objeto usando a tecnica SPREAD
    const pessoas = [...pessoas_40, ...pessoas_70]
        // crio um novo array de objeto usando somente o nome e idade
        .map((pessoa) => {
            const { first } = pessoa.name;
            const { age } = pessoa.dob;
            return {
                'nome': first,
                'idade': age
            }
        })
        // faço uma ordenação pela idade
        .sort((a, b) => {
            if (a.idade > b.idade) {
                return 1;
            }
            if (a.idade < b.idade) {
                return -1;
            }
            return 0
        });

    console.log(pessoas);
}

const usandoRest = () => {
    console.log(somaInfinita(1, 2, 1, 1));
}

const somaInfinita = (...numeros) => {
    return numeros.reduce((acumulador, atual) => {
        return acumulador + atual
    }, 0);
}

const usandoDestructuring = () => {
    const pessoa = people.results[0];
    // console.log(pessoa);
    // repetitivo
    // const username = pessoa.login.username;
    // const password = pessoa.login.password;
    const { username, password, ...rest } = pessoa.login;
    console.log(username, password);
    console.log(rest);
}
