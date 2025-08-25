export default callback => {
  let touchStartY = 0;
  let isLocked = false; // prevents multiple triggers
  const lockTime = 800; // ms delay before allowing another trigger

  function triggerOnce(direction) {
    if (isLocked) return;
    isLocked = true;
    callback(direction);
    setTimeout(() => {
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
    if (e.deltaY > 0 && atBottom()) {
      triggerOnce('next');
    } else if (e.deltaY < 0 && atTop()) {
      triggerOnce('prev');
    }
  }

  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function onTouchEnd(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (deltaY > 50 && atBottom()) {
      triggerOnce('next');
    } else if (deltaY < -50 && atTop()) {
      triggerOnce('prev');
    }
  }

  onMounted(() => {
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
  });
};
