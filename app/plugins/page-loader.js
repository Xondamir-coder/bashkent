export default defineNuxtPlugin(() => {
  const newPageName = useState('newPageName', () => '');
  const pages = useState('pages', () => [
    'index',
    'about',
    'portfolio',
    'architecture',
    'formula',
    'housing',
    'infrastructure'
  ]);

  const router = useRouter();
  const { showPageLoader } = useLoader();

  // const PAGE_LOADER_DURATION = 1;
  const PAGE_DELAY = 0.85;

  if (!import.meta.client) return;

  router.beforeEach(async (to, from) => {
    const pageName = to.name.split('___')[0];

    if (!from.name || !pages.value.includes(from.name.split('___')[0])) {
      return;
    }

    if (pages.value.includes(pageName)) {
      newPageName.value = pageName;
      showPageLoader.value = true;

      // delay navigation
      await new Promise(resolve => setTimeout(resolve, PAGE_DELAY * 1000));

      return true;
    } else {
      newPageName.value = '';
      return true;
    }
  });
});
