// HERANÇA

class Pessoa{

    constructor(nome, peso, altura) {
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }

    olaPessoa(){
        console.log(`Olá ${this.nome} peso ${this.peso} altura ${this.altura}`)
    }

}

class Cliente extends Pessoa {
    constructor(nome, peso, altura, email) {
        super(nome, peso, altura); // vai herdar tudo que existe da classe pai
        this.email = email;
    }
}

const p = new Pessoa('cleber', 67, 1.71);
const c = new Cliente('barbara', 58, 1.63, 'ui@gmail.com');
console.log(p);
console.log(c);
c.olaPessoa();