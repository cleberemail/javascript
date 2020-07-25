window.addEventListener('load', () => {
    const github = fetch('https://api.github.com/users/cleberemail').then(res => {
        res.json().then(data => {
            showData(data);
        });
    }).catch(error => {
        console.log('erro na requisição');
    });
});

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
