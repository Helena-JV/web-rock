console.log('script activo');

// CONSTANTES -------------------------------------------
const ROOT = document.querySelector(':root');


// FONT WEIGHT RANGE ---------------------------------------
const FONT_WEIGHT_RANGE = document.querySelector('#fntWeightRange');
let range_value = 300;

FONT_WEIGHT_RANGE.addEventListener('change', function(event){
    range_value = event.target.value
    console.log('Estás cambiando el font weight a ' + range_value);

    ROOT.style.setProperty('--font-weigtht', range_value);
    buildInfoFooter(range_value, currentColor, mode); 
});

// COLOR SELECTOR -------------------------------------------
const COLOR_SELECTOR = document.querySelectorAll('#imgColorChanger input');
let currentColor = '#ea1707';

COLOR_SELECTOR.forEach(function(selector){
    selector.style.backgroundColor = selector.value;

    selector.addEventListener('click', function(){
        currentColor = selector.value;
        console.log('Color cambiado a ' + currentColor)
        ROOT.style.setProperty('--accent-clr', currentColor);
        buildInfoFooter(range_value, currentColor, mode); 
    })
});

// DARK MODE ---------------------------------------------------
const DARK_MODE_BTN = document.querySelector('.dark-mode-btn input');
const BODY = document.querySelector('body');
let mode = 'Dark';

DARK_MODE_BTN.addEventListener('click', function(){
    BODY.classList.toggle('dark-mode');
    BODY.classList.toggle('light-mode');
    
    if (BODY.classList.contains('dark-mode')){
        mode = 'Dark';
    }else {
        mode = 'Light';
    }
    console.log(mode + ' mode')
    buildInfoFooter(range_value, currentColor, mode);
});

// SCRATCH PATTERN -----------------------------------------------
/*
    Para intercambair 2 imágenes según el scroll, he hayado el resto del scrollY, y si era par ponía una image, y si no, otra.
    El problema era que me salía el decimal .5 muchas veces, y, por eso, se me seteaba siempre el else por lo que he buscado en internet y he encontrado que hay una manera de redondearlo con Math.floor(),
    Después ví que iba demasiado rápido, así que hice el (window.scrollY / 100), para que tomase más pixels
*/
window.addEventListener('scroll', function() {
    const basePath = window.location.pathname.split('/')[1] ? `/${window.location.pathname.split('/')[1]}` : '';

    if (Math.floor(window.scrollY / 100) % 2 === 0) {
        ROOT.style.setProperty('--scratch_pattern', `url(${basePath}/assets/img/scratch_pattern/scratch_1.webp)`);
    } else {
        ROOT.style.setProperty('--scratch_pattern', `url(${basePath}/assets/img/scratch_pattern/scratch_2.webp)`);
    }
});



// BUILD INFO FOOTER ------------------------------------------------
/*
    He creado una variable por cada <span> del footer. 
    He creado una función que le pasa los 3 valores de las variables que necesita (al principio eran constantes y tuve que sacarlas)
    He igualado el inner text de cada <span> a las variables.
    He inicializado la función.
    En cada EventListener que cambia alguno de estos parámetros se llama a la función
    Como las variables se inicializan fuera de los AdEventListener, siempre están disponibles
*/
let infoGrosorTexto = document.querySelector('#infoGrosorTexto');
let infoColor = document.querySelector('#infoColor');
let darkMode = document.querySelector('#darkMode');

function buildInfoFooter(range_value, currentColor, mode) {
    infoGrosorTexto.innerText = range_value;
    infoColor.innerText = currentColor;
    darkMode.innerText = mode;   
};

buildInfoFooter(range_value, currentColor, mode);


