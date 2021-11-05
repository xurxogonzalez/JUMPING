"use strict";

let isGameOver = false; //Si el juego está acabado cargamos la estructura del juego
let platformCount = 5; //número de plataformas para crear

//Nodos
let panel = document.querySelector(".panel");

/**
 * 
 * @param {HTMLElement} element objeto del DOM del que se determinará su altura
 * @returns {Number} Tamaño en píxeles del elemento
 */

const getHeight = element => element.offsetHeight || element.style.pixelHeight;
/**
 * 
 * @param {HTMLElement} element objeto del DOM del que se determinará su anchura
 * @returns {Number} Tamaño en píxeles del elemento
 */
const getWidth = element => element.offsetWidth || element.style.pixelWidth;


/**
 * 
 * @param {Number} platformTop Posición desde lo alto (top) en la que se ubicarán las plataformas
 * @param {Number} platformLeft Posición desde la izquierda (left) en la que se ubicarán las plataformas
 */
const createPlatform = () => {
    deletePlats();
    for (let i = 0; i < platformCount; i++) {
        let platformGap = getHeight(panel) / platformCount;
        let platformLeft = Math.random() * (getWidth(panel) - 85);//85 es el ancho de la plataforma
        let platformTop = platformGap - 20 + i * platformGap;
        let divEl = document.createElement("div");
        divEl.classList.add("platform");
        divEl.style.top = `${platformTop}px`;
        divEl.style.left = `${platformLeft}px`;
        panel.appendChild(divEl);
    }
}

/**
 * Eliminar todos los elementos plataforma
 */
const deletePlats = () => {
    let platforms = document.querySelectorAll(".platform");
    platforms.forEach(
        el => {
            el.parentElement.removeChild(el);
        }
    );
}

/**
 * Se dispara el juego
 */
const start = () => {
    if (isGameOver === false) {

        try {




            createPlatform();

        } catch (error) {
            console.log(`JavaScript. Creo que seleccionaste mal elemento : ${error}`);
        }
    }

}


start();


//Eventos
window.addEventListener(
    "resize",
    () => {
        createPlatform();
    }
);