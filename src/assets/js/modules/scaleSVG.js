import { gsap } from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const svgAnimate = gsap.timeline({
    scrollTrigger:{
        trigger: ".clients__imgs-box",
        start: "center bottom",
        end: "center top",
        scrub: true,
    }
});

const scrollTriggerSVG = () =>{
    svgAnimate.from(".svg-icon", {
        duration: 2,
        scale: 0.5, 
        opacity: 0, 
        delay: 0.1, 
        stagger: 0.2,
        ease: "elastic", 
        force3D: true
    })
}

export default scrollTriggerSVG;

