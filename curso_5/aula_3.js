// POLIMORFISMO

class Atleta{

    constructor(nome, peso, altura) {
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }

    static comparePosts(item1, item2){
        return item1.date - item2.date;
    }

    get nome() {
        return this._nome;
    }

    set nome(value) {
        this._nome = value;
    }

    get peso() {
        return this._peso;
    }

    set peso(value) {
        this._peso = value;
    }
    
    get altura() {
        return this._altura;
    }

    set altura(value) {
        this._altura = value;
    }

    getIMC(peso, altura) {
        return peso / (altura * altura);
    }

    static formatarIMC(imc){
        return imc.toFixed(2);
    }
}

const cleber = new Atleta();
cleber.nome = 'cleber';
cleber.peso = 67;
cleber.altura = 1.71;

console.log(cleber);
console.log(cleber.nome, cleber.altura, cleber.peso);
console.log(`${cleber.nome} tem ${Atleta.formatarIMC(cleber.getIMC(cleber.peso, cleber.altura))} IMC`);
