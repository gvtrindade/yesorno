//Puxa o número de decisões tomadas da memória
let numeroDecisoes
if (localStorage["numeroDecisao"] == "NaN") {
    numeroDecisoes = 1
} else {
    numeroDecisoes = localStorage["numeroDecisao"]
        ++numeroDecisoes
}


//Apresentar resposta ao carregar a página
window.onload = function() {
    resultado();
    registerSW();
}

//Função para recarregar a página
function reload() {
    location.reload();
}

//Selecionar resposta
const resposta = document.getElementById("resposta");
let numResposta = Math.round(Math.random());
const arrayResposta = ["No", "Yes"]


// //Selecionar pergunta do botão
const botao = document.getElementById("botao")
const textoBotao = [
    "Tem certeza?",
    "Quer tentar de novo?",
    "É uma boa?",
    "Que tal outra?"
]

let numBotao = function() {
    const min = Math.ceil(0)
    const max = Math.floor(textoBotao.length - 1)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let ultimoNumero = numBotao()

//Função para seleção da resposta ao apertar o botão

const numDecisoes = document.getElementById("numDecisoes")

if (!("numeroDecisao" in localStorage)) {
    numDecisoes.innerText = 0
} else {
    numDecisoes.innerText = numeroDecisoes
};


function resultado() {
    resposta.innerText = arrayResposta[numResposta];
    botao.innerText = textoBotao[ultimoNumero];
    localStorage["numeroDecisao"] = numeroDecisoes
}

//Função que ativa o service worker
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./service-worker.js');
        } catch (e) {
            alert('ServiceWorker registration failed. Sorry about that.');
        }
    } else {
        document.querySelector('.alert').removeAttribute('hidden');
    }
}