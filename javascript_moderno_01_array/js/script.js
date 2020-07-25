window.addEventListener('load', () => {
  let btn1 = document.querySelector('#btn1');
  let btn2 = document.querySelector('#btn2');
  let btn3 = document.querySelector('#btn3');
  let btn4 = document.querySelector('#btn4');
  let btn5 = document.querySelector('#btn5');
  let btn6 = document.querySelector('#btn6');
  let btn7 = document.querySelector('#btn7');
  let btn8 = document.querySelector('#btn8');
  let btn9 = document.querySelector('#btn9');

  btn1.addEventListener('click', usandoMap);
  btn2.addEventListener('click', usandoFilterIdadeDefinido);
  btn3.addEventListener('click', usandoFilterIdadeParametro);
  btn4.addEventListener('click', usandoforEach);
  btn5.addEventListener('click', usandoReduce);
  btn6.addEventListener('click', usandoFind);
  btn7.addEventListener('click', usandoSome);
  btn8.addEventListener('click', usandoEvery);
  btn9.addEventListener('click', usandoSort);
});

function usandoMap() {
  const nameEmailArray = people.results.map((pessoa) => {
    return {
      name: pessoa.name,
      email: pessoa.email,
    };
  });
  console.log(nameEmailArray);
  return nameEmailArray;
}

function usandoFilterIdadeDefinido() {
  const idadeArray = people.results.filter((pessoa) => {
    return pessoa.dob.age > 70;
  });
  console.log(idadeArray);
}

function usandoFilterIdadeParametro(idade) {
  const pessoas = people.results.filter((pessoa) => hasThanMore(pessoa, idade));
  console.log(pessoas);
}

function hasThanMore(pessoa, idade) {
  return pessoa.dob.age > idade;
}

function usandoforEach() {
  const pessoas = usandoMap();
  pessoas.forEach((pessoa) => {
    pessoa.nameSize = (pessoa.name.title + ' ' + pessoa.name.first + ' ' + pessoa.name.last).length;
  });
}

function usandoReduce() {
  const totalIdade = people.results.reduce((acumulador, atual) => {
    return acumulador + atual.dob.age;
  }, 0);
  console.log(totalIdade);
}

function usandoFind() {
  const encontrou = people.results.find(pessoa => {
    return pessoa.location.country === 'Brazil';
  });
  console.log(encontrou);
}

function usandoSome() {
  const encontrou = people.results.some(pessoa => {
    return pessoa.location.country === 'Brazil';
  });
  console.log(encontrou);
}

function usandoEvery() {
  const encontrou = people.results.every(pessoa => {
    return pessoa.dob.age > 18;
  });
  console.log(encontrou);
}

function usandoSort() {
  const ordenado = people.results.map(pessoa => pessoa.name.first).filter(pessoa => pessoa.startsWith('A')).sort();
  //const ordenado = people.results.map(pessoa => pessoa.name.first.length).sort();
  console.log(ordenado);
}