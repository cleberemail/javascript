// METODO STATIC

class Post{
    constructor(titulo, date) {
        this.titulo = titulo;
        this.date = date;
    }

    static comparePosts(item1, item2){
        return item1.date - item2.date;
    }
}

const posts = [
    new Post('titulo 1', Math.round(Math.random() * 10)),
    new Post('titulo 2', Math.round(Math.random() * 10)),
    new Post('titulo 3', Math.round(Math.random() * 10)),
    new Post('titulo 4', Math.round(Math.random() * 10)),
    new Post('titulo 5', Math.round(Math.random() * 10)),
    new Post('Title 1', new Date(2018, 8, 4)),
    new Post('Title 2', new Date(2018, 9, 4)),
    new Post('Title 3', new Date(2018, 4, 6)),
    new Post('Tilte 4', new Date(2018, 4, 20)),
    new Post('Tilte 5', new Date(2018, 4, 1)),
]

let a = posts.sort();
console.log(a);