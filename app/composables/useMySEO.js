import en from '~/assets/data/seo/en.json';
import ru from '~/assets/data/seo/ru.json';
import uz from '~/assets/data/seo/uz.json';

const seo = {
  en,
  ru,
  uz
};

export default pageName => {
  const { locale } = useI18n();
  useSeoMeta({
    title: seo[locale.value][pageName]?.title,
    description: seo[locale.value][pageName]?.description
  });
};
