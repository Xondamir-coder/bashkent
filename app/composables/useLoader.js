const showPreloader = ref(true);
const showPageLoader = ref(false);

export default () => {
  const togglePreloader = val => {
    showPreloader.value = val ?? !showPreloader.value;
  };

  const togglePageLoader = val => {
    showPageLoader.value = val ?? !showPageLoader.value;
  };

  return {
    showPreloader,
    showPageLoader,
    togglePreloader,
    togglePageLoader
  };
};
