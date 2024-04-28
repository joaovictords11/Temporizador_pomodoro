const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');
const botaoStartPause = document.querySelector('#start-pause');
const textoIniciarOuPausar = document.querySelector('#start-pause span')
const imagemIniciarOuPausar = document.querySelector('.app__card-primary-butto-icon')
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const tempoNaTela = document.querySelector('#timer')
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somTermino = new Audio('./sons/beep.mp3');


musica.loop = true;

let tempoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', function(){
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

botaoFoco.addEventListener('click', function(){
    tempoEmSegundos = 1500;
    alterarContexto('foco');
    botaoFoco.classList.add('active');
})

botaoCurto.addEventListener('click', function(){
    tempoEmSegundos = 300;
    alterarContexto('descanso-curto');
    botaoCurto.classList.add('active');
})

botaoLongo.addEventListener('click', function(){
    tempoEmSegundos = 900;
    alterarContexto('descanso-longo');
    botaoLongo.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoEmSegundos <= 0){
        somTermino.play()
        textoIniciarOuPausar.textContent = "Continuar"
        imagemIniciarOuPausar.setAttribute('src', './imagens/play_arrow.png')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoEmSegundos -= 1;
    mostrarTempo()
}

botaoStartPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if (intervaloId){
        somPause.play()
        textoIniciarOuPausar.textContent = "Continuar"
        imagemIniciarOuPausar.setAttribute('src', './imagens/play_arrow.png')
        zerar()
        return 
    }
    somPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    textoIniciarOuPausar.textContent = "Pausar"
    imagemIniciarOuPausar.setAttribute('src', './imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()