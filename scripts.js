window.onload = function(){
	resposta();
}

function resposta(){
	const resposta = document.getElementById("resposta");
	Array.prototype.rand = function(){
	return this[Math.floor(Math.random() * this.length)];
	};
	resposta.innerText = ["Yes","No"].rand();
}

function reload(){
	location.reload();	
}
