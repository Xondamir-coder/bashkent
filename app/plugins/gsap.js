import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    gsap.registerPlugin(DrawSVGPlugin, SplitText);
  }

  return {
    provide: {
      gsap
    }
  };
});
