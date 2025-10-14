export default callback => {
  if (!import.meta.client) return;

  const route = useRoute();
  const allowedPages = useState('pages');

  // local-only lock state
  let isLocked = false;
  let unlockTimer = null;
  let touchStartY = 0;

  const lockTime = 2000;
  const minDelta = 30;

  const isScrollablePage = () => {
    const current = route.name?.split('___')[0];
    return allowedPages.value.includes(current);
  };

  function triggerOnce(direction) {
    // Do nothing if page not in scrollable list
    if (!isScrollablePage()) return;
    if (isLocked) return;

    isLocked = true;
    callback(direction);

    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(() => {
      isLocked = false;
    }, lockTime);
  }

  function atTop() {
    return window.scrollY === 0;
  }

  function atBottom() {
    return Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
  }

  function onWheel(e) {
    if (!isScrollablePage()) return;
    if (isLocked) {
      e.preventDefault();
      return;
    }

    if (e.deltaY > minDelta && atBottom()) {
      e.preventDefault();
      triggerOnce('next');
    } else if (e.deltaY < -minDelta && atTop()) {
      e.preventDefault();
      triggerOnce('prev');
    }
  }

  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function onTouchEnd(e) {
    if (!isScrollablePage() || isLocked) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (deltaY > minDelta && atBottom()) {
      triggerOnce('next');
    } else if (deltaY < -minDelta && atTop()) {
      triggerOnce('prev');
    }
  }

  onMounted(() => {
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
    clearTimeout(unlockTimer);
  });
};
