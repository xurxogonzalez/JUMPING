"use strict";

/**
 * Variables primitivas
 */
let isGameOver = false; //Si el juego está acabado cargamos la estructura del juego
let platformCount = 5; //número de plataformas para crear
let platforms = [];
let intervalMovePlatId = null;

/**
* 
* Creación de una plataforma sobre el que saltará el personaje
*
*/
class Platform {
    //campo privados
    #bottom = 0;
    #left = 0;
    #visual = null;
    /**
     * 
     * @param {Number} bottom Posicición hacia abajo en que aparece el elemento (position: absolute) con respecto a su padre (position: relative)
     * @param {Number} left Posicición a la izquierda en que aparece el elemento (position: absolute) con respecto a su padre (position: relative)
     */
    constructor(bottom, left) {
        this.#bottom = bottom;
        this.#left = left;
        this.#visual = window.document.createElement("div"); //Creamos nodo en el DOM

        const visual = this.#visual;
        visual.classList.add("platform");
        visual.style.bottom = `${this.#bottom}px`;
        visual.style.left = `${this.#left}px`;
    }

    /**
     * Método getter que devuelve el nodo DOM de la plataforma
     */
    get getVisual(){
        return this.#visual;
    }

    /**
     * 
     * @param {Number} size Tamaño de desplazamiento por defecto
     */
    move(size=4) {
        this.#bottom -= size;
        const visual = this.#visual;
        visual.style.bottom = `${this.#bottom}px`;
    }
}

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
const createPlatforms = () => {
    for (let i = 0; i < platformCount; i++) {
        let platformGap = getHeight(panel) / platformCount;
        let platformLeft = Math.random() * (getWidth(panel) - 85);//85 es el ancho de la plataforma
        let platformBottom = platformGap - 20 + i * platformGap;
        platforms.push(new Platform(platformBottom, platformLeft));
        console.log(platforms);
        panel.appendChild(platforms[i].getVisual);
    }
}



/**
 * Función para mover las plataformas
 */
const movePlatforms = () => {
    platforms.forEach(
        (platform, index) => {
            platform.move(4); 
            //Cuando lleguemos a la última plataforma y su posición bottom sea negativa 
            //detenemos el movimiento           
            if (index === platforms.length - 1 && platform.bottom < -20) {
                clearInterval(intervalMovePlatId);
            }
        }
    );
}



/**
 * Se dispara el juego
 */
const start = () => {
    if (isGameOver === false) {
        try {
            createPlatforms();
            intervalMovePlatId = setInterval(movePlatforms, 40);
        } catch (error) {
            console.log(`JavaScript. Creo que seleccionaste mal elemento : ${error}`);
        }
    }
}

//Empieza todo aquí
start();