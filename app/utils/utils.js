export const reloadPage = () => {
  window.location.reload();
};
export const toRoman = num => {
  if (num < 1 || num > 50) {
    throw new Error('Number must be between 1 and 50');
  }

  const romanMap = [
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  let result = '';
  for (const { value, numeral } of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};
export const objectToFormData = data => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return formData;
};
export const seo = {
  en: {
    home: {
      title: 'Modern Apartments in Bukhara',
      description:
        'Discover Bashkent Residence in Bukhara: modern apartments with urban comfort, thoughtful infrastructure, and a touch of history. Find your new home today.',
      keywords:
        'apartments in Bukhara, real estate Bukhara, buy apartment Bukhara, Bashkent Residence, modern housing Bukhara',
      og: {
        title: 'Modern Apartments in Bukhara',
        description:
          'Discover Bashkent Residence in Bukhara: modern apartments with urban comfort, thoughtful infrastructure, and a touch of history.'
      }
    },
    about: {
      title: 'About Bashkent Residence in Bukhara',
      description:
        'Learn about Bashkent Residence in Bukhara – modern architecture, thoughtful infrastructure, and comfortable living in harmony with the city.',
      keywords:
        'about Bashkent Residence, apartments in Bukhara, residential complex Bukhara, modern housing Bukhara',
      og: {
        title: 'About Bashkent Residence in Bukhara',
        description:
          'Discover Bashkent Residence in Bukhara – modern living with comfort and cultural harmony.'
      }
    },
    'advanced-search': {
      title: 'Advanced Apartment Search',
      description:
        'Filter apartments in Bukhara by floor, layout, area, rooms, renovation type, and completion date. View detailed apartment cards.',
      keywords:
        'advanced apartment search Bukhara, apartment filter floor, apartment filter layout, apartment by area, apartment by rooms, renovated apartments, completion date apartments, apartment listings Bukhara',
      og: {
        title: 'Advanced Apartment Search – Filters & Results',
        description:
          'Filter apartments in Bukhara by floor, layout, area, rooms, renovation type, and completion date. Browse detailed listings.'
      }
    },
    architecture: {
      title: 'Architecture & Design Features',
      description:
        'Explore Bashkent Residence architecture in Bukhara: terraces, panoramic windows, facade lighting, bicycle paths, recreation areas, and parking.',
      keywords:
        'Bashkent Residence architecture, terraces Bukhara, panoramic windows, facade lighting, bicycle paths, recreation area, parking',
      og: {
        title: 'Architecture & Design Features',
        description:
          'Discover Bashkent Residence in Bukhara: terraces, panoramic windows, facade lighting, bicycle paths, recreation areas, and parking.'
      }
    },
    calculator: {
      title: 'Apartment Price Calculator – Bashkent Residence',
      description:
        'Calculate your apartment price at Bashkent Residence in Bukhara. Choose layout, floor, and completion date to view detailed payment and pricing options.',
      keywords:
        'apartment calculator Bukhara, Bashkent Residence calculator, apartment price, layout selection, floor choice, completion date, payment options',
      og: {
        title: 'Apartment Price Calculator – Bashkent Residence',
        description:
          'Use the Bashkent Residence calculator to find the price of your apartment in Bukhara by selecting layout, floor, and completion date.'
      }
    },
    contacts: {
      title: 'Contacts & Nearby Facilities',
      description:
        'Contact Bashkent Residence and explore nearby facilities: shopping, schools, parks, universities, theaters, and cultural spots in Bukhara.',
      keywords:
        'contacts Bukhara, nearby facilities, shopping malls, stores, schools, parks, universities, theaters, cultural and leisure facilities',
      og: {
        title: 'Contacts & Nearby Facilities',
        description:
          'Find contacts and nearby facilities: shopping, schools, parks, universities, theaters, and cultural spots near Bashkent Residence in Bukhara.'
      }
    },
    formula: {
      title: 'Formula for Success',
      description:
        'Discover Bashkent Residence in Bukhara by the numbers: 38 buildings, 2928 apartments, green zones, sports grounds, schools, wellness complex, parking.',
      keywords:
        'Bashkent Residence numbers, residential buildings Bukhara, apartments Bukhara, green zones, sports grounds, school, wellness complex, parking spaces',
      og: {
        title: 'Formula for Success – Bashkent Residence in Numbers',
        description:
          'Explore Bashkent Residence in Bukhara: 38 buildings, 2928 apartments, green zones, sports grounds, schools, wellness complex, and parking.'
      }
    },
    housing: {
      title: 'Housing Options & Apartment Features in Bukhara',
      description:
        'Explore modern apartments in Bukhara with natural lighting, ventilation, ergonomic kitchens, balconies, wardrobes, and flexible renovation options.',
      keywords:
        'housing Bukhara, apartments Bukhara, natural lighting, ventilation, ergonomic kitchen, balconies, wardrobes, ready for renovation, finished renovation, choose floor, choose view',
      og: {
        title: 'Housing Options & Apartment Features in Bukhara',
        description:
          'Modern apartments in Bukhara with natural lighting, ventilation, ergonomic kitchens, balconies, wardrobes, and flexible renovation options.'
      }
    },
    infrastructure: {
      title: 'Infrastructure & Security in Bukhara',
      description:
        'Next-generation security and modern technologies ensure safety, comfort, and 24/7 monitoring for residents in Bashkent Residence, Bukhara.',
      keywords:
        'infrastructure Bukhara, modern technologies, home security, 24/7 monitoring, safe residential complex, comfortable living',
      og: {
        title: 'Infrastructure & Security – Modern Comfort in Bukhara',
        description:
          'Discover Bashkent Residence infrastructure: next-gen security, modern tech, and 24/7 monitoring for maximum comfort and safety.'
      }
    },
    masterplan: {
      title: 'Masterplan & Interactive Map',
      description:
        'View the interactive masterplan of Bashkent Residence in Bukhara with phases, buildings, floors, and apartments.',
      keywords:
        'masterplan Bukhara, residential complex plan, Bashkent Residence plan, building plan, apartment map, interactive masterplan',
      og: {
        title: 'Masterplan & Interactive Map',
        description:
          'Explore the Bashkent Residence masterplan: interactive map of buildings, floors, and apartments.'
      }
    },
    portfolio: {
      title: 'Portfolio Projects in Uzbekistan',
      description:
        'Explore Bashkent Residence portfolio projects in Uzbekistan, including AGMK production plants in Almalyk and the University of Social Innovations in Tashkent.',
      keywords:
        'AGMK Almalyk, production plants Uzbekistan, industrial facilities, University of Social Innovations Tashkent, social innovations, technology university',
      og: {
        title: 'Portfolio Projects in Uzbekistan',
        description:
          'Discover Bashkent Residence portfolio: AGMK production plants in Almalyk and the University of Social Innovations in Tashkent.'
      }
    },
    select: {
      title: 'Selection Method: Visual or Advanced Filtering',
      description:
        'Choose how you want to search: use visual selection on the masterplan facade or advanced filters by price and area.',
      keywords:
        'selection method, apartment search options, visual search masterplan, facade selection, advanced filters, choose by price, choose by area',
      og: {
        title: 'Selection Method – Visual or Advanced Filtering',
        description:
          'Decide how to proceed: explore with visual search on the masterplan facade or use advanced filtering by price and area.'
      }
    }
  },
  ru: {
    home: {
      title: 'Современные квартиры в Бухаре',
      description:
        'Bashkent Residence в Бухаре - современные квартиры с городским комфортом и историческим колоритом. Найдите свой новый дом сегодня.',
      keywords:
        'квартиры в Бухаре, недвижимость Бухара, купить квартиру Бухара, Bashkent Residence, современное жильё Бухара',
      og: {
        title: 'Современные квартиры в Бухаре',
        description:
          'Bashkent Residence в Бухаре - современные квартиры с городским комфортом и историческим колоритом.'
      }
    },
    about: {
      title: 'О Bashkent Residence в Бухаре',
      description:
        'Узнайте о Bashkent Residence в Бухаре – современная архитектура, продуманная инфраструктура и комфортная жизнь в гармонии с городом.',
      keywords:
        'о Bashkent Residence, квартиры в Бухаре, жилой комплекс Бухара, современное жильё Бухара',
      og: {
        title: 'О Bashkent Residence в Бухаре',
        description:
          'Откройте для себя Bashkent Residence в Бухаре – современная жизнь с комфортом и культурной гармонией.'
      }
    },
    'advanced-search': {
      title: 'Расширенный поиск квартир',
      description:
        'Фильтруйте квартиры в Бухаре по этажу, планировке, площади, комнатам, ремонту и дате сдачи. Просматривайте подробные карточки.',
      keywords:
        'расширенный поиск квартир Бухара, фильтр квартир по этажу, фильтр квартир по планировке, квартиры по площади, квартиры по комнатам, отремонтированные квартиры, квартиры по дате сдачи, объявления о квартирах Бухара',
      og: {
        title: 'Расширенный поиск квартир – фильтры и результаты',
        description:
          'Фильтруйте квартиры в Бухаре по этажу, планировке, площади, комнатам, ремонту и дате сдачи. Просматривайте подробные объявления.'
      }
    },
    architecture: {
      title: 'Архитектура и особенности дизайна',
      description:
        'Исследуйте архитектуру Bashkent Residence: террасы, панорамные окна, подсветка фасада, велодорожки, зоны отдыха и парковка.',
      keywords:
        'архитектура Bashkent Residence, террасы Бухара, панорамные окна, подсветка фасада, велосипедные дорожки, зона отдыха, парковка',
      og: {
        title: 'Архитектура и особенности дизайна',
        description:
          'Откройте для себя Bashkent Residence в Бухаре: террасы, панорамные окна, подсветка фасада, велосипедные дорожки, зоны отдыха и парковка.'
      }
    },
    calculator: {
      title: 'Калькулятор цены квартиры – Bashkent Residence',
      description:
        'Рассчитайте цену квартиры в Bashkent Residence: выберите планировку, этаж и дату сдачи, чтобы увидеть варианты оплаты.',
      keywords:
        'калькулятор квартиры Бухара, калькулятор Bashkent Residence, цена квартиры, выбор планировки, выбор этажа, дата сдачи, варианты оплаты',
      og: {
        title: 'Калькулятор цены квартиры – Bashkent Residence',
        description:
          'Используйте калькулятор Bashkent Residence, чтобы узнать цену вашей квартиры в Бухаре, выбрав планировку, этаж и дату сдачи.'
      }
    },
    contacts: {
      title: 'Контакты и ближайшие объекты',
      description:
        'Свяжитесь с Bashkent Residence и узнайте о ближайших объектах: магазины, школы, парки, университеты и культурные места.',
      keywords:
        'контакты Бухара, ближайшие объекты, торговые центры, магазины, школы, парки, университеты, театры, культурные и досуговые объекты',
      og: {
        title: 'Контакты и ближайшие объекты',
        description:
          'Найдите контакты и ближайшие объекты: магазины, школы, парки, университеты, театры и культурные места рядом с Bashkent Residence в Бухаре.'
      }
    },
    formula: {
      title: 'Формула успеха',
      description:
        'Bashkent Residence в цифрах: 38 зданий, 2928 квартир, зеленые зоны, спортплощадки, школы, велнес-комплекс, парковка.',
      keywords:
        'цифры Bashkent Residence, жилые здания Бухара, квартиры Бухара, зеленые зоны, спортивные площадки, школа, велнес-комплекс, парковочные места',
      og: {
        title: 'Формула успеха – Bashkent Residence в цифрах',
        description:
          'Исследуйте Bashkent Residence в Бухаре: 38 зданий, 2928 квартир, зеленые зоны, спортивные площадки, школы, велнес-комплекс и парковка.'
      }
    },
    housing: {
      title: 'Варианты жилья и особенности квартир в Бухаре',
      description:
        'Современные квартиры с естественным освещением, вентиляцией, эргономичными кухнями, балконами, шкафами и гибкими вариантами ремонта.',
      keywords:
        'жильё Бухара, квартиры Бухара, естественное освещение, вентиляция, эргономичная кухня, балконы, шкафы, готово к ремонту, завершённый ремонт, выбор этажа, выбор вида',
      og: {
        title: 'Варианты жилья и особенности квартир в Бухаре',
        description:
          'Современные квартиры в Бухаре с естественным освещением, вентиляцией, эргономичными кухнями, балконами, шкафами и гибкими вариантами ремонта.'
      }
    },
    infrastructure: {
      title: 'Инфраструктура и безопасность в Бухаре',
      description:
        'Современные технологии безопасности и круглосуточный мониторинг обеспечивают комфорт и защиту для жителей Bashkent Residence.',
      keywords:
        'инфраструктура Бухара, современные технологии, безопасность дома, круглосуточный мониторинг, безопасный жилой комплекс, комфортное проживание',
      og: {
        title: 'Инфраструктура и безопасность – современный комфорт в Бухаре',
        description:
          'Откройте для себя инфраструктуру Bashkent Residence: современная безопасность, новейшие технологии и круглосуточный мониторинг для максимального комфорта и безопасности.'
      }
    },
    masterplan: {
      title: 'Генплан и интерактивная карта',
      description:
        'Просмотрите интерактивный генплан Bashkent Residence в Бухаре с фазами, зданиями, этажами и квартирами.',
      keywords:
        'генплан Бухара, план жилого комплекса, план Bashkent Residence, план здания, карта квартир, интерактивный генплан',
      og: {
        title: 'Генплан и интерактивная карта',
        description:
          'Исследуйте генплан Bashkent Residence: интерактивная карта зданий, этажей и квартир.'
      }
    },
    portfolio: {
      title: 'Портфельные проекты в Узбекистане',
      description:
        'Исследуйте проекты Bashkent Residence: AGMK в Алмалыке и Университет социальных инноваций в Ташкенте.',
      keywords:
        'AGMK Алмалык, производственные заводы Узбекистан, промышленные объекты, Университет социальных инноваций Ташкент, социальные инновации, технологический университет',
      og: {
        title: 'Портфельные проекты в Узбекистане',
        description:
          'Откройте портфель Bashkent Residence: производственные заводы AGMK в Алмалыке и Университет социальных инноваций в Ташкенте.'
      }
    },
    select: {
      title: 'Метод выбора – визуальный или продвинутый фильтр',
      description:
        'Выберите способ поиска: используйте визуальный выбор на фасаде мастерплана или продвинутые фильтры по цене и площади.',
      keywords:
        'метод выбора, варианты поиска квартир, визуальный поиск мастерплана, выбор фасада, продвинутые фильтры, выбор по цене, выбор по площади',
      og: {
        title: 'Метод выбора – визуальный или продвинутый фильтр',
        description:
          'Решите, как действовать: исследуйте с помощью визуального поиска на фасаде мастерплана или используйте продвинутую фильтрацию по цене и площади.'
      }
    }
  },
  uz: {
    home: {
      title: 'Buxorodagi zamonaviy kvartiralar',
      description:
        "Buxorodagi Bashkent Residence: shahar qulayligi, puxta infratuzilma va tarixiy ta'sir bilan zamonaviy kvartiralar. Yangi uyingizni toping.",
      keywords:
        "Buxorodagi kvartiralar, Buxoro ko'chmas mulki, Buxoroda kvartira sotib olish, Bashkent Residence, zamonaviy uy-joy Buxoro",
      og: {
        title: 'Buxorodagi zamonaviy kvartiralar',
        description:
          "Buxorodagi Bashkent Residence: shahar qulayligi, puxta infratuzilma va tarixiy ta'sir bilan zamonaviy kvartiralar."
      }
    },
    about: {
      title: 'Buxorodagi Bashkent Residence haqida',
      description:
        'Bashkent Residence bilan tanishing – zamonaviy arxitektura, puxta infratuzilma va shahar bilan uyg‘un qulay yashash.',
      keywords:
        'Bashkent Residence haqida, Buxorodagi kvartiralar, Buxoro turar joy majmuasi, zamonaviy uy-joy Buxoro',
      og: {
        title: 'Buxorodagi Bashkent Residence haqida',
        description:
          'Bashkent Residence bilan tanishing – qulaylik va madaniy uyg‘unlik bilan zamonaviy yashash.'
      }
    },
    'advanced-search': {
      title: 'Kengaytirilgan kvartira qidiruvi',
      description:
        'Buxorodagi kvartiralarni qavat, reja, maydon, xonalar soni, ta’mirlash turi va topshirish sanasi bo‘yicha filtrlash. Batafsil kartochkalarni ko‘ring.',
      keywords:
        'Buxoro kvartiralarini kengaytirilgan qidiruv, kvartiralarni qavat bo‘yicha filtrlash, kvartiralarni reja bo‘yicha filtrlash, maydon bo‘yicha kvartiralar, xonalar bo‘yicha kvartiralar, ta’mirlangan kvartiralar, foydalanishga topshirilgan sana bo‘yicha kvartiralar, Buxoro kvartira e’lonlari',
      og: {
        title: 'Kengaytirilgan kvartira qidiruvi – filtrlash va natijalar',
        description:
          'Buxorodagi kvartiralarni qavat, reja, maydon, xonalar soni, ta’mirlash turi va topshirish sanasi bo‘yicha filtrlash. Batafsil e’lonlarni ko‘ring.'
      }
    },
    architecture: {
      title: 'Arxitektura va dizayn xususiyatlari',
      description:
        'Bashkent Residence arxitekturasini o‘rganing: terraslar, panoramik oynalar, fasad yoritilishi, velosiped yo‘llari, dam olish zonalari va parking.',
      keywords:
        'Bashkent Residence arxitekturasi, Buxoro terraslari, panoramik oynalar, fasad yoritilishi, velosiped yo‘llari, dam olish zonasi, parking',
      og: {
        title: 'Arxitektura va dizayn xususiyatlari',
        description:
          'Bashkent Residence bilan tanishing: terraslar, panoramik oynalar, fasad yoritilishi, velosiped yo‘llari, dam olish zonalari va parking.'
      }
    },
    calculator: {
      title: 'Kvartira narxini hisoblash – Bashkent Residence',
      description:
        'Buxorodagi Bashkent Residence kvartira narxini hisoblang: reja, qavat va topshirish sanasini tanlab to‘lov variantlarini ko‘ring.',
      keywords:
        'Buxoro kvartira kalkulyatori, Bashkent Residence kalkulyatori, kvartira narxi, reja tanlovi, qavat tanlovi, topshirish sanasi, to‘lov variantlari',
      og: {
        title: 'Kvartira narxini hisoblash – Bashkent Residence',
        description:
          'Bashkent Residence kalkulyatori yordamida reja, qavat va topshirish sanasini tanlab kvartira narxini aniqlang.'
      }
    },
    contacts: {
      title: 'Kontaktlar va yaqin atrofdagi obyektlar',
      description:
        'Bashkent Residence bilan bog‘laning va yaqin atrofdagi obyektlarni o‘rganing: do‘konlar, maktablar, bog‘lar, universitetlar va madaniy joylar.',
      keywords:
        'Buxoro kontaktlari, yaqin atrofdagi obyektlar, savdo markazlari, do‘konlar, maktablar, bog‘lar, universitetlar, teatrlar, madaniy va dam olish obyektlari',
      og: {
        title: 'Kontaktlar va yaqin atrofdagi obyektlar',
        description:
          'Bashkent Residence yaqinidagi kontaktlar va obyektlarni toping: do‘konlar, maktablar, bog‘lar, universitetlar, teatrlar va madaniy joylar Buxoroda.'
      }
    },
    formula: {
      title: 'Muvaffaqiyat formulasi',
      description:
        'Bashkent Residence’ni raqamlar orqali kashf eting: 38 bino, 2928 kvartira, yashil zonalar, sport maydonchalari, maktablar, sog‘lomlashtirish kompleksi, parking.',
      keywords:
        'Bashkent Residence raqamlari, Buxorodagi turar joy binolari, Buxorodagi kvartiralar, yashil zonalar, sport maydonchalari, maktab, sog‘lomlashtirish kompleksi, parking joylari',
      og: {
        title: 'Muvaffaqiyat formulasi – Bashkent Residence raqamlarda',
        description:
          'Bashkent Residence’ni kashf eting: 38 bino, 2928 kvartira, yashil zonalar, sport maydonchalari, maktablar, sog‘lomlashtirish kompleksi va parking.'
      }
    },
    housing: {
      title: 'Buxorodagi uy-joy variantlari va kvartira xususiyatlari',
      description:
        'Buxorodagi zamonaviy kvartiralarni o‘rganing: tabiiy yorug‘lik, shamollatish, ergonomik oshxonalar, balkonlar, shkaflar va moslashuvchan ta’mirlash variantlari.',
      keywords:
        'Buxoro uy-joyi, Buxorodagi kvartiralar, tabiiy yorug‘lik, shamollatish, ergonomik oshxona, balkonlar, shkaflar, ta’mirga tayyor, yakunlangan ta’mir, qavatni tanlash, manzarani tanlash',
      og: {
        title: 'Buxorodagi uy-joy variantlari va kvartira xususiyatlari',
        description:
          'Buxorodagi zamonaviy kvartiralar: tabiiy yorug‘lik, shamollatish, ergonomik oshxonalar, balkonlar, shkaflar va moslashuvchan ta’mirlash variantlari bilan.'
      }
    },
    infrastructure: {
      title: 'Buxorodagi infratuzilma va xavfsizlik',
      description:
        'Bashkent Residence xavfsizlik, qulaylik va 24/7 nazorat bilan yangi avlod texnologiyalarini taqdim etadi.',
      keywords:
        'Buxoro infratuzilmasi, zamonaviy texnologiyalar, uy xavfsizligi, 24/7 nazorat, xavfsiz turar joy majmuasi, qulay yashash',
      og: {
        title: 'Infratuzilma va xavfsizlik – Buxoroda zamonaviy qulaylik',
        description:
          'Bashkent Residence infratuzilmasini kashf eting: xavfsizlik, zamonaviy texnologiyalar va 24/7 nazorat bilan maksimal qulaylik.'
      }
    },
    masterplan: {
      title: 'Masterplan va interaktiv xarita',
      description:
        'Buxorodagi Bashkent Residence interaktiv masterplanini ko‘ring: fazalar, binolar, qavatlar va kvartiralar bilan.',
      keywords:
        'Buxoro masterplani, turar joy majmuasi rejasi, Bashkent Residence rejasi, bino rejasi, kvartira xaritasi, interaktiv masterplan',
      og: {
        title: 'Masterplan va interaktiv xarita',
        description:
          'Bashkent Residence masterplanini o‘rganing: binolar, qavatlar va kvartiralarning interaktiv xaritasi.'
      }
    },
    portfolio: {
      title: 'O‘zbekiston bo‘ylab portfolio loyihalari',
      description:
        'Bashkent Residence portfolio loyihalari: Almalykdagi AGMK ishlab chiqarish korxonalari va Toshkentdagi Ijtimoiy Innovatsiyalar Universiteti.',
      keywords:
        'AGMK Almalyk, O‘zbekistondagi ishlab chiqarish korxonalari, sanoat obyektlari, Toshkentdagi Ijtimoiy Innovatsiyalar Universiteti, ijtimoiy innovatsiyalar, texnologiya universiteti',
      og: {
        title: 'O‘zbekiston bo‘ylab portfolio loyihalari',
        description:
          'Bashkent Residence portfelini kashf eting: Almalykdagi AGMK korxonalari va Toshkentdagi Ijtimoiy Innovatsiyalar Universiteti.'
      }
    },
    select: {
      title: 'Tanlash usuli – Vizual yoki ilg‘or filtrlash',
      description:
        'Qidirishni tanlang: masterplan fasadida vizual tanlash yoki narx va maydon bo‘yicha ilg‘or filtrlardan foydalaning.',
      keywords:
        'tanlash usuli, kvartira qidirish variantlari, masterplan vizual qidiruv, fasad tanlovi, ilg‘or filtrlash, narx bo‘yicha tanlash, maydon bo‘yicha tanlash',
      og: {
        title: 'Tanlash usuli – Vizual yoki ilg‘or filtrlash',
        description:
          'Qanday qidirishni hal qiling: masterplan fasadida vizual qidiruv yoki narx va maydon bo‘yicha ilg‘or filtrlash.'
      }
    }
  }
};
