// Fazendo o Vetor de Imagens das Cartas
let imagens = [];
for (let i = 1; i <= 12; i++) {
    imagens.push('imagens/' + i + '.jpg');
};

//Fundo das
let fundo = 'imagens/fundo.jpg';

//Vetor de Cartas
cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];

//Variaveis do Jogo
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;
const timerJogo = new Timer('#timer');

onload = () => {
    
    //Carrega as imagens de Fundo
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach(
        (img, i) => {
            img.src = fundo;
            img.setAttribute('data-valor', i);
        }
    );

    //Cria o evento do Botão
    document.querySelector('#btSorteio').onclick = iniciaJogo;
};

//--------------------------------------------
// Inicia Jogo
//--------------------------------------------
const iniciaJogo = () => {

    //embaralhar as cartas
    for (let i = 0; i < cartas.length; i++) {
        let p = Math.trunc(Math.random() * cartas.length);
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;
    }

    // Evento das imagens
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach(
        (img, i) => {
            img.onclick = trataCliqueImagem;
            img.src = fundo;
        }
    );

    //Reinicia Jogo
    cliquesTravados = false;
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
    pontos = 0;

    //Ajuste Interface
    document.querySelector('#btSorteio').disabled = true;
    document.querySelector('#timer').style.backgroundColor = 'orange';
    timerJogo.start();

};

//--------------------------------------------
// Processa o clique
//--------------------------------------------
const trataCliqueImagem = (e) => {
    if (cliquesTravados) return;
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor - 1];
    e.target.onclick = null;

    if (!temCartaVirada) {
        temCartaVirada = true;
        posicaoCartaVirada = p;
        valorCartaVirada = valor;
    } else {
        if (valor == valorCartaVirada) {
            pontos++;
        } else {
            cliquesTravados = true;
            const p0 = posicaoCartaVirada;
            setTimeout(() => {
                e.target.src = fundo;
                e.target.onclick = trataCliqueImagem;
                let img = document.querySelector('#memoria #i' + p0);
                img.src = fundo;
                img.onclick = trataCliqueImagem;
                cliquesTravados = false;
            }, 1500);
        }
        temCartaVirada = false;
        posicaoCartaVirada = -1;
        valorCartaVirada = 0;
    }
    if (pontos == 12) {
        document.querySelector('#btSorteio').disabled = false;
        document.querySelector('#timer').style.backgroundColor = 'green';
        timerJogo.stop();
    }
}

//--------------------------------------------
// Timer
//--------------------------------------------
const tempo = new Timer('#timer');

function Timer(e) {
    this.element = e;
    this.time = 0;
    this.control = null;
    this.start = () => {
        this.time = 0;
        this.control = setInterval(() => {
            this.time++;
            const minutos = Math.trunc(this.time / 60);
            const segundos = this.time % 60;
            document.querySelector(this.element).innerHTML = (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
        }, 1000);
    };
    this.stop = () => {
        clearInterval(this.control);
        this.control = null;
    };
}