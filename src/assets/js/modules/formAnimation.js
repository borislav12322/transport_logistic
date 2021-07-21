import { gsap } from "gsap/dist/gsap";

const formAnimation = () =>{
    gsap.to('.form',{duration: 2.5, ease: 'elastic.out(1, 0.3)',x: 750})
}

export default formAnimation;


