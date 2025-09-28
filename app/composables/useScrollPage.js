// 🔒 Global lock state
let isGlobalLocked = false;
let globalUnlockTimer = null;

export default callback => {
  if (!import.meta.client) return;

  let touchStartY = 0;
  const lockTime = 3000; // 3s minimum lock
  const minDelta = 30; // threshold for trackpad/touch
  const isGoingForward = useState('isGoingForward');
  const timeoutAfterPageLoader = 1500;

  function triggerOnce(direction) {
    if (isGlobalLocked) return;
    isGlobalLocked = true;

    callback(direction);

    // Keep checking + fixing scroll during lock
    const fixScroll = () => {
      if (isGlobalLocked) {
        requestAnimationFrame(fixScroll);
      }
    };
    requestAnimationFrame(fixScroll);

    // Unlock after 3s
    if (globalUnlockTimer) clearTimeout(globalUnlockTimer);
    globalUnlockTimer = setTimeout(() => {
      isGlobalLocked = false;
    }, lockTime);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, lockTime * 0.5);
  }

  function atTop() {
    return window.scrollY === 0;
  }

  function atBottom() {
    return Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
  }

  function onWheel(e) {
    if (isGlobalLocked) {
      e.preventDefault(); // kill leftover momentum
      return;
    }

    if (e.deltaY > minDelta && atBottom()) {
      e.preventDefault();
      triggerOnce('next');
      isGoingForward.value = true;
    } else if (e.deltaY < -minDelta && atTop()) {
      e.preventDefault();
      triggerOnce('prev');
      isGoingForward.value = false;
    }
  }

  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function onTouchEnd(e) {
    if (isGlobalLocked) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (deltaY > minDelta && atBottom()) {
      triggerOnce('next');
    } else if (deltaY < -minDelta && atTop()) {
      triggerOnce('prev');
    }
  }

  const showPageLoader = useState('showPageLoader');
  watch(showPageLoader, () => {
    if (!import.meta.client) return;
    if (!showPageLoader.value) {
      setTimeout(() => {
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
      }, timeoutAfterPageLoader);
    }
  });

  onMounted(() => {
    if (showPageLoader.value || !import.meta.client) return;

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  });

  onUnmounted(() => {
    if (!import.meta.client) return;

    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
  });
};
