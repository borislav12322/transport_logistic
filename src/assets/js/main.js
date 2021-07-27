'use strict'
import formAnimation from './modules/formAnimation';
import scrollTriggerSVG from './modules/scaleSVG';

const mobileBtn = document.getElementById('mobileBtn');
mobileBtn.addEventListener('click', function(e){
    const mobileMenu = document.querySelector('.mobile-menu')
    mobileMenu.classList.toggle('active')
})

let scrollPos = 0;
const header = document.querySelector('.header');

const hideHeader = () =>{
    let windowY = window.scrollY;
    if(windowY < scrollPos){
        header.classList.add('visible');
        header.classList.remove('hidden');
    } else {
        header.classList.add('hidden')
        header.classList.remove('visible')
    }
    scrollPos = windowY;
};

window.addEventListener('scroll', hideHeader)

formAnimation();
scrollTriggerSVG();



