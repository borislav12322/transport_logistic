import { gsap } from "gsap/dist/gsap";

const lineAnimation = () => {
gsap.from(".animation-line", {
    duration: 2,
    scale: 0.5, 
    opacity: 0, 
    delay: 0.5, 
    stagger: 0.2,
    ease: "elastic", 
    force3D: true
});
}
  
export default lineAnimation;