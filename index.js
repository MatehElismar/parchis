
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

let turno = -1;
let turnoColor = 'amarillo'


function tirar() {
    const dado1Imagen = document.getElementById('dado1-imagen')
    const dado2Imagen = document.getElementById('dado2-imagen')
    dado1Imagen.classList.remove('hidden')
    dado2Imagen.classList.remove('hidden')
    let rand = Math.floor((Math.random() * 6) + 1)
    document.images["ima1"].src = eval("dado" + rand + ".src");
    const dados1Result = document.querySelectorAll('.dado1-result');
    dados1Result.forEach(el => {
        el.innerHTML = rand;

    })
    rand = Math.floor((Math.random() * 6) + 1)
    const dados2Result = document.querySelectorAll('.dado2-result');
    dados2Result.forEach(el => {
        el.innerHTML = rand;

    })
    document.images["ima2"].src = eval("dado" + rand + ".src");

    const fichas = document.querySelectorAll(`.ficha.${turnoColor}`);
    fichas.forEach(f => {
        f.classList.add('dropdown')
    })
}


function start() {
    siguienteTurno();
}



function moverFicha(fichaID, steps) {
    if (steps == 6) steps = 12;//el 6 vale 12
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
    ficha.dataset.active = true;
}

function siguienteTurno() {
    const lanzarBtn = document.getElementById('lanzarButton')
    const dado1Imagen = document.getElementById('dado1-imagen')
    const dado2Imagen = document.getElementById('dado2-imagen')

    // desabilitar el turno anterior
    const fichas = document.querySelectorAll(`.ficha.${turnoColor}`);
    fichas.forEach(f => {
        f.classList.remove('dropdown')
    })

    const dados1Result = document.querySelectorAll('.dado1-result');
    dados1Result.forEach(el => {
        el.disabled = false;
    })

    const dados2Result = document.querySelectorAll('.dado2-result');
    dados2Result.forEach(el => {
        el.disabled = false;
    })

    dado1Disabled = false;
    dado2Disabled = false;

    if (turno < 3) {
        turno++;
    }
    else turno = 0;

    let homeID = ''
    if (turno == 0) {
        turnoColor = 'amarillo'
        homeID = 'amarillo-home'
    }
    else if (turno == 1) {
        turnoColor = 'azul'
        homeID = 'azul-home'
    }
    else if (turno == 2) {
        turnoColor = 'rojo'
        homeID = 'rojo-home'
    }
    else if (turno == 3) {
        turnoColor = 'verde'
        homeID = 'verde-home'
    }
    const home = document.getElementById(homeID)
    lanzarBtn.classList.remove('hidden')
    dado1Imagen.classList.add('hidden')
    dado2Imagen.classList.add('hidden')
    home.appendChild(lanzarBtn)
    home.appendChild(dado1Imagen)
    home.appendChild(dado2Imagen)
}


let dado1Disabled = false;
let dado2Disabled = false;
function onDiceClick(fichaID, e) {
    const ficha = document.getElementById(fichaID);
    const steps = e.target.innerHTML;


    if (ficha.dataset.active || steps == 5) {
        if (e.target.className.includes('dado1-result')) {
            dado1Disabled = true;
            const dados1Result = document.querySelectorAll('.dado1-result');
            dados1Result.forEach(el => {
                el.disabled = true;

            })
        }
        else if (e.target.className.includes('dado2-result')) {
            dado2Disabled = true;
            const dados2Result = document.querySelectorAll('.dado2-result');
            dados2Result.forEach(el => {
                el.disabled = true;

            })
        }
    }
    if (ficha.dataset.active) {
        moverFicha(fichaID, steps)

    }
    else if (steps == 5) {
        sacarFicha(fichaID)
    }
    else alert('nope')

    if (dado1Disabled && dado2Disabled) {

        siguienteTurno();
    }

}


(function () {
    // your page initialization code here
    // the DOM will be available here 
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => start())

})();