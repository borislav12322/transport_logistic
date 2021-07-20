import formAnimation from './gsap/formAnimation';

const mobileBtn = document.getElementById('mobileBtn');
mobileBtn.addEventListener('click', function(e){
    const mobileMenu = document.querySelector('.mobile-menu')
    mobileMenu.classList.toggle('active')
})

formAnimation();


