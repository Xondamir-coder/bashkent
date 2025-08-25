import gsap from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    gsap.registerPlugin(DrawSVGPlugin, ScrambleTextPlugin);
  }

  return {
    provide: {
      gsap
    }
  };
});
