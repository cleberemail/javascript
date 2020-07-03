// CLASSE

class Pessoa {
    constructor(nome, email, peso) {
        this.nome = nome;
        this.email = email;
        this.peso = peso;
    }

    metodo(){
        console.log(`Olá ${this.nome} seu e-mail é ${this.email}`);
    }

}

let objeto = new Pessoa("cleber","cleber.email@gmail.com",67.5);
console.log(objeto);
objeto.nome = "barbara";
objeto.email = "barbara.aline.libras@gmail.com";
objeto.peso = 58;
console.log(objeto);
objeto.metodo();