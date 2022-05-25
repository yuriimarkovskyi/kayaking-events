import { createSlice } from '@reduxjs/toolkit';
import { guidesList } from '../constants/guidesList';

const eventsSlice = createSlice({
  name: 'events',
  initialState: [
    {
      id: 1,
      name: 'Острів Муромець',
      link: 'ostriv-muromec',
      title: 'Похід на каяках довкола острова Муромець',
      description: 'Друзі, запрошуємо вас на прогулянку каяками довкола острова Муромець!',
      imageCover: `${process.env.PUBLIC_URL}/images/primary/ostriv-muromec.jpg`,
      dates: [
        {
          date: 1655203681000,
          totalPlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          freePlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          guide: guidesList.filter((el) => el.id === 1),
        },
        {
          date: 1625605200001,
          totalPlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          freePlaces: {
            soloKayaks: 5,
            doubleKayaks: 5,
          },
          guide: guidesList.filter((el) => el.id === 2),
        },
      ],
      price: [
        {
          id: 'soloKayak',
          title: 'Одномісний каяк:',
          price: 730,
        },
        {
          id: 'doubleKayak',
          title: 'Двомісний каяк:',
          price: 570,
        },
      ],
      imagesSlider: [
        `${process.env.PUBLIC_URL}/images/secondary/IMG_7989.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8026.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8070.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8924.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8925.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8926.jpg`,
      ],
      descriptionFeatures: [
        'Умовно маршрут можна розділити на три частини: Дніпро, Десенка, Бобрівня.',
        'Вийдемо із затоки Наталка й підемо проти течії на північ.',
        'Пофотографуємось біля великого затонулого дерева й завернемо у Десну. Це єдина велика річка країни, яка не перегороджена ГЕС.',
        'Висадимось на берег, аби перекусити й обнести дамбу, яка розділяє Десну й Десенку.',
        'Побачимо затоку Доманя. Раніше тут лежав ланцюжок вузьких озер-стариць, поки з них не стали брати пісок для будівництва Троєщини.',
        'Пройдемо Десенкою - річкою, в якій течія є лише кілька разів на рік, коли відкривають греблю.',
        'Перетнемо острів Муромець вузькою й дуже гарною річкою, що розділяє його на дві частини - Бобрівнею. Опісля вийдемо на Дніпро і повернемось на станцію прокату.',
      ],
    },
    {
      id: 2,
      name: 'Серцем Києва',
      link: 'sercem-kyjeva',
      title: 'Похід на каяках “Серцем Києва”',
      description: 'Друзі, запрошуємо вас у похід, що проходить у самому центрі нашого з вами улюбленого міста! Якщо ви новенький у місті або хочете побачити його з нової точки зору, цей сплав саме для вас!',
      imageCover: `${process.env.PUBLIC_URL}/images/primary/sercem-kyjeva.jpg`,
      dates: [
        {
          date: 1655203681000,
          totalPlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          freePlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          guide: guidesList.filter((el) => el.id === 1),
        },
        {
          date: 1625605200001,
          totalPlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          freePlaces: {
            soloKayaks: 5,
            doubleKayaks: 5,
          },
          guide: guidesList.filter((el) => el.id === 2),
        },
      ],
      price: [
        {
          soloKayak: {
            title: 'Одномісний каяк:',
            price: 730,
          },
          doubleKayak: {
            title: 'Двомісний каяк:',
            price: 570,
          },
        },
      ],
      imagesSlider: [
        `${process.env.PUBLIC_URL}/images/secondary/IMG_7989.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8026.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8070.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8924.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8925.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8926.jpg`,
      ],
      descriptionFeatures: [
        'Це єдиний наш сплав, який дозволить побачити Київ саме зсередини.',
        'Сядемо в каяки й вирушимо по Десенці на північ.',
        'Пройдемо повз Подільсько-Воскресенський, Петрівский, Північний мости. Обігнемо острів Лопухуватий та зробимо на ньому привал.',
        'Опісля вирушимо до Дніпра, через мальовничу річку Бобрівня.',
        'Вийдемо на Дніпро й рушимо вниз за течією. Нашому оку відкриються краєвиди правого берега Києва: Оболонь, Рибальський півострів, Поділ. Зміна перспективи дуже змінює сприйняття одного й того ж самого місця.',
        'Незадовго до фінішу зробимо ще один привал на Трухановому острові. Чи є у вас фотографії на Пішохідному мосту з веслами й у жилетах? Ні? Що ж, будуть 😉. Зробимо фото на пам’ять, трохи відпочинемо, й опісля вирушимо на фінішну пряму.',
      ],
    },
    {
      id: 3,
      name: 'Жуків Острів',
      link: 'zhukiv-ostriv',
      title: 'Похід на Жуків острів',
      description: 'Друзі, запрошуємо вас у похід, що проходить у самому центрі нашого з вами улюбленого міста! Якщо ви новенький у місті або хочете побачити його з нової точки зору, цей сплав саме для вас!',
      imageCover: `${process.env.PUBLIC_URL}/images/primary/sercem-kyjeva.jpg`,
      dates: [
        {
          date: 1655203681000,
          totalPlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          freePlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          guide: guidesList.filter((el) => el.id === 1),
        },
        {
          date: 1625605200001,
          totalPlaces: {
            soloKayaks: 10,
            doubleKayaks: 10,
          },
          freePlaces: {
            soloKayaks: 5,
            doubleKayaks: 5,
          },
          guide: guidesList.filter((el) => el.id === 2),
        },
      ],
      price: [
        {
          soloKayak: {
            title: 'Одномісний каяк:',
            price: 730,
          },
          doubleKayak: {
            title: 'Двомісний каяк:',
            price: 570,
          },
        },
      ],
      imagesSlider: [
        `${process.env.PUBLIC_URL}/images/secondary/IMG_7989.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8026.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8070.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8924.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8925.jpg`,
        `${process.env.PUBLIC_URL}/images/secondary/IMG_8926.jpg`,
      ],
      descriptionFeatures: [
        'Це єдиний наш сплав, який дозволить побачити Київ саме зсередини.',
        'Сядемо в каяки й вирушимо по Десенці на північ.',
        'Пройдемо повз Подільсько-Воскресенський, Петрівский, Північний мости. Обігнемо острів Лопухуватий та зробимо на ньому привал.',
        'Опісля вирушимо до Дніпра, через мальовничу річку Бобрівня.',
        'Вийдемо на Дніпро й рушимо вниз за течією. Нашому оку відкриються краєвиди правого берега Києва: Оболонь, Рибальський півострів, Поділ. Зміна перспективи дуже змінює сприйняття одного й того ж самого місця.',
        'Незадовго до фінішу зробимо ще один привал на Трухановому острові. Чи є у вас фотографії на Пішохідному мосту з веслами й у жилетах? Ні? Що ж, будуть 😉. Зробимо фото на пам’ять, трохи відпочинемо, й опісля вирушимо на фінішну пряму.',
      ],
    },
  ],
  reducers: {
  },
});

export default eventsSlice.reducer;
