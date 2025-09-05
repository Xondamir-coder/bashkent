export default (containerRef, options = {}) => {
  if (!import.meta.client) return;

  let rafId;
  let cleanupFn;

  const {
    selector = '.home__image',
    strength = 30, // movement multiplier
    ease = 0.15 // smoothing factor
  } = options;

  const initParallax = () => {
    if (!containerRef.value) return;

    const elements = containerRef.value.querySelectorAll(selector);

    const layers = Array.from(elements).map(el => ({
      el,
      depth: parseFloat(el.dataset.depth) || 1
    }));

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const mouseMoveHandler = e => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', mouseMoveHandler);

    const animate = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      layers.forEach(({ el, depth }) => {
        el.style.transform = `translate3d(${currentX * depth * strength}px, ${
          currentY * depth * strength
        }px, 0)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    cleanupFn = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      cancelAnimationFrame(rafId);
    };
  };

  onMounted(() => {
    if (window.innerWidth < 1024) return;
    initParallax();
  });
  onBeforeUnmount(() => cleanupFn && cleanupFn());
};
