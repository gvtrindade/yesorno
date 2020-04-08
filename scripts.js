//Apresentar resposta ao carregar a página
window.onload = function() {
    resultado();
    // registerSW();
}

//Função do botão de resultado
function reload() {
    resultado();
}

let ultimoNumero
let numeroAtual

//Função para seleção da resposta ao apertar o botão
function resultado() {

    //Puxa o número de decisões tomadas da memória local
    let numeroDecisoes
    const numDecisoes = document.getElementById("numDecisoes")
    const decisao = document.getElementById("decisao")
    if (localStorage["numeroDecisao"] == "NaN") {
        numeroDecisoes = 0
    } else {
        numeroDecisoes = localStorage["numeroDecisao"]
            ++numeroDecisoes
    }

    if (!("numeroDecisao" in localStorage)) {
        numDecisoes.innerText = 1
    } else {
        numDecisoes.innerText = numeroDecisoes
    };

    if (numDecisoes.innerText == 1) {
        decisao.innerText = "decisão"
    } else {
        decisao.innerText = "decisões"
    }

    //Selecionar resposta
    const resposta = document.getElementById("resposta");
    let numResposta = Math.round(Math.random());
    const arrayResposta = ["No", "Yes"]

    //Selecionar pergunta do botão
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

    // debugger

    numeroAtual = numBotao()

    while (ultimoNumero == numeroAtual) {
        numeroAtual = numBotao()
    }

    //Apresenta a resposta e a pergunta do botão e registra o número de decisões
    resposta.innerText = arrayResposta[numResposta];
    botao.innerText = textoBotao[numeroAtual];
    localStorage["numeroDecisao"] = numeroDecisoes

    ultimoNumero = numeroAtual

}

// //Função que ativa o service worker
// async function registerSW() {
//     if ('serviceWorker' in navigator) {
//         try {
//             await navigator.serviceWorker.register('./service-worker.js');
//         } catch (e) {
//             alert('ServiceWorker registration failed. Sorry about that.');
//         }
//     } else {
//         document.querySelector('.alert').removeAttribute('hidden');
//     }
// }