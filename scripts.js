window.onload = function() {
    resposta();
}

function resposta() {
    const resposta = document.getElementById("resposta");
    Array.prototype.rand = function() {
        return this[Math.floor(Math.random() * this.length)];
    };
    resposta.innerText = ["Yes", "No"].rand();
}

function reload() {
    location.reload();
}

window.addEventListener('load', e => {
    // new PWAConfApp();
    registerSW();
});

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