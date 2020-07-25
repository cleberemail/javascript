window.addEventListener('load', () => {
    const intervalo = document.querySelector('#intervalo');
    let count = 0;
    // repetir uma função infinitamente de acordo com intervalo de tempo
    tempo = setInterval(() => {
        intervalo.textContent = ++count;
        if (count == 10) {
            // cancelar o setInterval
            clearInterval(tempo);
            return;
        }
        if (count % 2 == 0) {
            // postegar um função após um intervalo de tempo
            setTimeout(() => {
                intervalo.textContent = count + 0.5;
            }, 500);
        }
    }, 1000);
});