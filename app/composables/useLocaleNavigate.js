export default path => {
  if (!import.meta.client) return;

  const localePath = useLocalePath();
  navigateTo(localePath(path));
};
