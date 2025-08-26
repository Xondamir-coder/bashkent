<template>
  <div class="layout">
    <Transition name="scale-out">
      <AppPreloader v-if="showPreloader" />
    </Transition>
    <Transition name="scale-out">
      <PageLoader v-if="showPageLoader" :data="pageLoaderData" />
    </Transition>
    <AppHeader v-if="isHeaderPresent" @toggle-modal="toggleContactsModal" />
    <Transition name="slide-in">
      <AppMenu v-if="showMenu" @toggle-modal="toggleContactsModal" @toggle-menu="toggleMenu" />
    </Transition>
    <AppSidebar :show-menu="showMenu" @toggle-menu="toggleMenu" />
    <slot />
    <Transition name="fade">
      <ContactsModal v-if="showContactsModal" @toggle-modal="toggleContactsModal" />
    </Transition>
  </div>
</template>

<script setup>
const { showPreloader, showPageLoader, togglePageLoader } = useLoader();
const route = useRoute();
const router = useRouter();

const showMenu = ref(false);
const showContactsModal = ref(false);
const newPageName = ref('');

const pages = [
  'index',
  'about',
  'portfolio',
  'architecture',
  'formula',
  'housing',
  'infrastructure'
];
const PAGE_LOADER_DURATION = 2;

const data = computed(() => [
  {
    name: 'index',
    title: 'Добро пожаловать в Bashkent Residence',
    texts: [
      'Bashkent Residence - это ваш дом в историческом центре Бухары',
      'В комплексе есть закрытый двор, детская площадка, спортзал ...'
    ]
  },
  {
    name: 'about',
    title: 'О комплексе',
    texts: [
      'Bashkent Residence - это жилой комплекс в историческом центре Бухары',
      '1600 квартир на 10-12 этажах с 2 лифтами, грузовым лифтом, мусоропроводом и видеонаблюдением.'
    ]
  },
  {
    name: 'portfolio',
    title: 'Надёжность, проверенная временем',
    texts: [
      'Застройщик — DUNE GROUP С 2019 года DUNE GROUP реализует амбициозные строительные проекты в Узбекистане, совмещая техническую экспертизу и чувство архитектурного такта.',
      'Компания делает ставку на устойчивое развитие, безопасность, технологичность и архитектурную выразительность.'
    ]
  },
  {
    name: 'architecture',
    title: 'Архитектура нового образа жизни',
    texts: [
      'Bashkent Residence спроектирован как замкнутый квартал с полной инфраструктурой.',
      'Комплекс включает 38 жилых здания, выполненных по монолитной технологии, с повышенной звукоизоляцией, продуманными входными группами, скоростными двумя ( пасажирский и грузовой) лифтами и фасадной отделкой из искусственного жидкогокамня'
    ],
    color: 'yellow'
  },
  {
    name: 'formula',
    title: 'Среда, в которой хочется жить',
    texts: [
      'Территория комплекса - 103 446 м², из которых почти треть отведена под зелёные зоны и места отдыха.'
    ]
  },
  {
    name: 'housing',
    title: 'Квартиры, которые дышат',
    texts: [
      'Каждая квартира в Bashkent Residence — это не просто жильё, а личное пространство, в котором легко жить, отдыхать, воспитывать детей и встречать гостей.'
    ],
    color: 'yellow'
  },
  {
    name: 'infrastructure',
    title: 'Инфраструктура и благоустройство',
    texts: [
      'Bashkent Residence — это не просто жилые дома, это интеллектуально спроектированная среда обитания'
    ]
  }
]);
const pageLoaderData = computed(() => data.value.find(item => item.name === newPageName.value));
const isHeaderPresent = computed(() => route.path !== '/select');

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const toggleContactsModal = () => {
  showMenu.value = false;
  showContactsModal.value = !showContactsModal.value;
};

if (import.meta.client) {
  router.beforeEach((to, from, next) => {
    if (pages.includes(to.name)) {
      newPageName.value = to.name;
      togglePageLoader();

      setTimeout(() => {
        next();
      }, 500);

      // just handle loader timings separately
      setTimeout(() => {
        togglePageLoader();
      }, PAGE_LOADER_DURATION * 1000);
    } else {
      next();
    }
  });
}

onMounted(() => {
  document.addEventListener('click', e => {
    if (showMenu.value && !e.target.closest('.menu') && !e.target.closest('.sidebar__ham')) {
      showMenu.value = false;
    }
  });
});
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100dvh;
  min-width: 100dvw;
  display: flex;
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-100%);
  @media screen and (max-width: 900px) {
    transform: scale(1.1);
    opacity: 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity vars.$dt;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-from > * {
  transform: translateX(100%);
}
.fade-leave-to > * {
  transform: translateX(100%);
}
.scale-out-enter-active,
.scale-out-leave-active {
  transition: all 0.5s ease;
}
.scale-out-enter-from,
.scale-out-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
