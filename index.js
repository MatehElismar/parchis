




function moverFicha(fichaID, steps) {
    const ficha = document.getElementById(fichaID);


}

function moveFichaForward(e) {
    const ficha = document.getElementById('ficha1');
    let spot = null;
    if (!ficha.dataset.llegamos) {
        ficha.dataset.spot = parseInt(ficha.dataset.spot) + 1
        spot = document.getElementById(`spot-${ficha.dataset.spot}`);
    }
    else {
        if (ficha.dataset.spot > 10) ficha.dataset.spot = 2;
        else ficha.dataset.spot = parseInt(ficha.dataset.spot) + 1
        spot = document.getElementById(`spot-amarillo-${ficha.dataset.spot}`);
    }
    if (ficha.classList.contains('ficha-amarilla') && spot.classList.contains('camino-amarillo')) {
        ficha.dataset.llegamos = true;
    }
    console.log('moving ficha', ficha, spot)

    spot.appendChild(ficha)
    // ficha.remove()



}


(function () {
    // your page initialization code here
    // the DOM will be available here
    const moveButton = document.getElementById('moveButton');
    moveButton.addEventListener('click', moveFichaForward)

})();