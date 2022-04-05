let musicas = [
    {
        titulo: 'Lanterna do afogados',
        artista: 'Paralamas do sucesso',
        src: 'musicas/paralamas-do-sucesso-lanterna-dos-afogados.mp3',
        img: 'imagens/paralamas1.jpg'
    },
    {
        titulo: 'Só chove',
        artista: 'Capital inicial',
        src: 'musicas/capital-inicial-só-chove.mp3',
        img: 'imagens/capital1.jpg'
    },
    {
        titulo: 'Só chove',
        artista: 'Capital inicial',
        src: 'musicas/capital-inicial-nao-olhe-pra-tras.mp3',
        img: 'imagens/capital2.jpg'
    },
];

let musica = document.querySelector("audio");
let indexMusica = 0;
let duracaoMusica = document.querySelector('.fim');

let imagem = document.querySelector('.descricao img');
let nomeDaMusica = document.querySelector('.descricao h4');
let nomeDoArtista = document.querySelector('.artist');

renderizarMusica(indexMusica);

//duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

//Eventos
document.querySelector("#botaoplay").addEventListener('click',tocarMusica);

document.querySelector("#botaopause").addEventListener('click',pausarMusica);

musica.addEventListener('timeupdate',atualizarBarra);

document.querySelector('#botaoLeft').addEventListener('click',()=>{
    indexMusica--;
    if(indexMusica<0){
        indexMusica=2;
    }
    renderizarMusica(indexMusica);
})

document.querySelector('#botaoRight').addEventListener('click',()=>{
    indexMusica++;
    if(indexMusica>2){
        indexMusica=0;
    }
    renderizarMusica(indexMusica);
})

//Funções
function renderizarMusica(index){
    musica.setAttribute('src',musicas[index].src);
    musica.addEventListener('loadeddata',()=>{
        nomeDaMusica.textContent = musicas[index].titulo;
        nomeDoArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica(){
    musica.play();
    document.querySelector("#botaopause").style.display = "block";
    document.querySelector("#botaoplay").style.display = "none";
}

function pausarMusica(){
    musica.pause();
    document.querySelector("#botaopause").style.display = "none";
    document.querySelector("#botaoplay").style.display = "block";
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor(musica.currentTime/musica.duration*100)+'%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
    let tempoLimite = document.querySelector('.fim');
    tempoLimite.textContent = segundosParaMinutos(Math.floor(musica.duration));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos/60);
    let campoSegundos = segundos % 60;
    if(campoSegundos<10){
        campoSegundos = '0' + campoSegundos;//dois dígitos no campo dos segundos
    }
    return campoMinutos+':'+campoSegundos;
}

