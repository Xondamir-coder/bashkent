export default defineNuxtPlugin(() => {
  const newPageName = useState('newPageName', () => '');
  const pages = useState('pages', () => [
    '/',
    '/about',
    '/portfolio',
    '/architecture',
    '/formula',
    '/housing',
    '/infrastructure'
  ]);

  const router = useRouter();
  const { showPageLoader } = useLoader();

  const PAGE_LOADER_DURATION = 1;
  const PAGE_DELAY = 1;

  if (!import.meta.client) return;

  router.beforeEach(async to => {
    if (pages.value.includes(to.path)) {
      newPageName.value = to.path;
      showPageLoader.value = true;

      // delay navigation
      await new Promise(resolve => setTimeout(resolve, PAGE_DELAY * 1000));

      setTimeout(() => {
        showPageLoader.value = false;
      }, PAGE_LOADER_DURATION * 1000);

      return true;
    } else {
      newPageName.value = '';
      return true;
    }
  });
});
