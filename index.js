
var dado1 = new Image()
var dado2 = new Image()
var dado3 = new Image()
var dado4 = new Image()
var dado5 = new Image()
var dado6 = new Image()

dado1.src = "img/dado1.png"
dado2.src = "img/dado2.png"
dado3.src = "img/dado3.png"
dado4.src = "img/dado4.png"
dado5.src = "img/dado5.png"
dado6.src = "img/dado6.png"


function tirar() {
    let rand = Math.floor((Math.random() * 6) + 1)
    document.images["ima1"].src = eval("dado" + rand + ".src");
    const dado1Result = document.getElementById('dato1-result');
    dado1Result.innerHTML = rand;
    rand = Math.floor((Math.random() * 6) + 1)
    const dado2Result = document.getElementById('dato2-result');
    dado2Result.innerHTML = rand;
    document.images["ima2"].src = eval("dado" + rand + ".src");
}

function rollTheDice() {

}



function moverFicha(fichaID, steps) {
    const ficha = document.getElementById(fichaID);
    let spot = null;
    for (let i = 0; i < steps; i++) {
        setTimeout((function (i) {
            return function () {
                if (!ficha.dataset.llegamos) {
                    ficha.dataset.spot = parseInt(ficha.dataset.spot) + 1
                    if (ficha.dataset.spot > 68) ficha.dataset.spot = parseInt(ficha.dataset.spot) - 68
                    spot = document.getElementById(`spot-${ficha.dataset.spot}`);
                }
                else {
                    if (ficha.dataset.spot > 10) ficha.dataset.spot = 2;
                    else ficha.dataset.spot = parseInt(ficha.dataset.spot) + 1
                    spot = document.getElementById(`spot-${ficha.dataset.color}-${ficha.dataset.spot}`);
                }
                if (ficha.dataset.color == spot.dataset.color && spot.classList.contains('camino')) {
                    ficha.dataset.llegamos = true;
                }
                console.log('moving ficha', ficha, spot)

                spot.appendChild(ficha)
            }
        })(i), i * 300);
    }

}

function sacarFicha(fichaID) {
    const ficha = document.getElementById(fichaID);
    ficha.classList.remove('relative')
    if (ficha.dataset.color == 'amarillo') ficha.dataset.spot = 5
    if (ficha.dataset.color == 'verde') ficha.dataset.spot = 56
    if (ficha.dataset.color == 'azul') ficha.dataset.spot = 22
    if (ficha.dataset.color == 'rojo') ficha.dataset.spot = 39
    spot = document.getElementById(`spot-${ficha.dataset.spot}`);
    spot.appendChild(ficha)
}


(function () {
    // your page initialization code here
    // the DOM will be available here
    const moveButton = document.getElementById('moveButton');
    const sacarButton = document.getElementById('sacarButton');
    sacarButton.addEventListener('click', () => sacarFicha("ficha10"))
    moveButton.addEventListener('click', () => moverFicha('ficha10', 70))

})();