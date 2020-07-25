let globalNames = ['um', 'dois', 'tres', 'quatro', 'cinco'];
let inputName = null;
let isEditing = false;
let currentIndex;

window.addEventListener('load', () => {
    inputName = document.querySelector('#name');
    preventFormSubmit();
    activateInput(inputName);
    render();
});

const preventFormSubmit = () => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
    };
    var form = document.querySelector('#frmNames');
    form.addEventListener('submit', handleFormSubmit);
};

const activateInput = () => {
    const insertNames = (newName) => {
        // globalNames.push(newName);
        globalNames = [...globalNames, newName];
    };
    const updateName = (newName) => {
        globalNames[currentIndex] = newName;
    };
    const handleType = (event) => {
        if (event.key === 'Enter') {
            if (isEditing) {
                updateName(event.target.value);
            } else {
                insertNames(event.target.value);
            }
            render();
            clearInput();
            isEditing = false;
        }
    };
    inputName.focus();
    inputName.addEventListener('keyup', handleType);
};

const render = () => {
    const createButtom = (indice) => {
        const deleteName = () => {

            // opção delete 1
            // globalNames.splice(indice, 1);

            // globalNames = globalNames.filter((name, i) => {

            // opção delete 2                
            // if (i === indice) {
            //      return false;
            // }
            // return true;

            // opção delete 3
            // return i === indice ? false : true;

            // opção delete 4
            // return i !== indice;

            //});

            // opção delete 5
            // globalNames = globalNames.filter((name, i) => i !== indice);

            // opção delete 6
            globalNames = globalNames.filter((_, i) => i !== indice);

            render();
        };
        var button = document.createElement('button');
        var textButton = document.createTextNode('X');
        button.addEventListener('click', deleteName);
        button.appendChild(textButton);
        button.classList.add('deleteName');
        return button;
    };
    const createLi = (i) => {
        createSpan = (name, index) => {
            const editItem = () => {
                inputName.value = name;
                inputName.focus();
                isEditing = true;
                currentIndex = index;
            };
            var span = document.createElement('span');
            var texto = document.createTextNode(name);
            span.appendChild(texto);
            span.classList.add('spanClick');
            span.addEventListener('click', editItem);
            return span;
        };
        var li = document.createElement('li');
        li.classList.add('formatList');
        li.appendChild(createButtom(i));
        li.appendChild(createSpan(globalNames[i], i));
        return li;
    };
    var ul = document.createElement('ul');
    for (var i = 0; i < globalNames.length; i++) {
        ul.appendChild(createLi(i));
    }
    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';
    divNames.appendChild(ul);
};

const clearInput = () => {
    inputName.value = '';
    inputName.focus();
};