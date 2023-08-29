const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.getElementById('start-pause')
const musicaFocoInput = document.getElementById('alternar-musica');
const inicarOuPausarBt = document.querySelector('#start-pause span');
const logoPausarOuInicar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const temporizadorPausado = new Audio('/sons/pause.mp3');
const temporizadorEncerrado = new Audio ('/sons/beep.mp3');
const temporizadorIniciado = new Audio ('/sons/play.wav');

musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;

musicaFocoInput.addEventListener('change', ()=> {
    if (musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
            case 'descanso-longo': 
            titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        temporizadorEncerrado.play();
        alert('Tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', inicarOuPausar);

function inicarOuPausar() {
    if (intervaloID) {
        temporizadorPausado.play();
        zerar();
        return;
    }
    temporizadorIniciado.play()
    intervaloID = setInterval(contagemRegressiva, 1000);
    inicarOuPausarBt.textContent = 'Pausar';
    logoPausarOuInicar.setAttribute('src', '/imagens/pause.png')


}

function zerar() {
    clearInterval(intervaloID);
    inicarOuPausarBt.textContent = 'Começar';
    logoPausarOuInicar.setAttribute('src', '/imagens/play_arrow.png')
    intervaloID = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();