// utils/navigation.ts
export default path => {
  const localePath = useLocalePath();
  return navigateTo(localePath(path));
};
