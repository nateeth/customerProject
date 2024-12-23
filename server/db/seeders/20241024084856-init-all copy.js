// 'use strict';

// const { User, Language, Topic, Card } = require('../models');

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     try {
//       // Сидеры для пользователей (учителей и студентов)
//       const users = await User.bulkCreate([
//         {
//           userName: 'Мария Ивановна',
//           email: 'ddd@ddd',
//           hashPass: '123',
//           isAdmin: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           userName: 'Снежана Денисовна',
//           email: 'hhh@hhh',
//           hashPass: '123',
//           isAdmin: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ]);

//       console.log('Созданные пользователи:', users);

//       if (users.length === 0) {
//         throw new Error('Не удалось создать пользователей');
//       }

//       // userId: DataTypes.INTEGER,
//       // cardId: DataTypes.INTEGER,
//       // isOpened: true,
//       // isStudied: true,

//       // Сидеры для групп
//       // const groups = await Group.bulkCreate([
//       //   {
//       //     groupName: 'Group A',
//       //     userId: users[0].id,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       //   {
//       //     groupName: 'Group B',
//       //     userId: users[1].id,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       // ]);

//       // Сидеры для языков
//       const languages = await Language.bulkCreate([
//         { langName: 'English', createdAt: new Date(), updatedAt: new Date() },
//         { langName: 'Italian', createdAt: new Date(), updatedAt: new Date() },
//         { langName: 'Chuvash', createdAt: new Date(), updatedAt: new Date() },
//         { langName: 'Spanish', createdAt: new Date(), updatedAt: new Date() },
//       ]);

//       if (languages.length === 0) {
//         throw new Error('Не удалось создать языки');
//       }

//       // Сидеры для тем
//       const topics = await Topic.bulkCreate([
//         {
//           topicName: 'Знакомство', // 0
//           isPublic: true,
//           langId: languages[0].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Путешествия', // 1
//           isPublic: true,
//           langId: languages[0].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Еда', // 2
//           isPublic: true,
//           langId: languages[0].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Животные', // 3
//           isPublic: true,
//           langId: languages[0].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Погода', // 4
//           isPublic: true,
//           langId: languages[0].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Веб-разработка', // 5
//           isPublic: true,
//           langId: languages[0].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           topicName: 'Знакомство', // 6
//           isPublic: true,
//           langId: languages[1].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Путешествия', // 7
//           isPublic: true,
//           langId: languages[1].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Еда', // 8
//           isPublic: true,
//           langId: languages[1].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Животные', // 9
//           isPublic: true,
//           langId: languages[1].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Погода', // 10
//           isPublic: true,
//           langId: languages[1].id,
//           authorId: users[0].id,
//           // groupId: groups[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           topicName: 'Знакомство', // 11
//           isPublic: true,
//           langId: languages[2].id,
//           authorId: users[1].id,
//           // groupId: groups[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           topicName: 'Знакомство', // 12
//           isPublic: true,
//           langId: languages[3].id,
//           authorId: users[1].id,
//           // groupId: groups[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Путешествия', // 13
//           isPublic: true,
//           langId: languages[3].id,
//           authorId: users[1].id,
//           // groupId: groups[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Еда', // 14
//           isPublic: true,
//           langId: languages[3].id,
//           authorId: users[1].id,
//           // groupId: groups[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           topicName: 'Животные', // 15
//           isPublic: true,
//           langId: languages[3].id,
//           authorId: users[1].id,
//           // groupId: groups[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           topicName: 'Погода', // 16
//           isPublic: true,
//           langId: languages[3].id,
//           authorId: users[1].id,
//           // groupId: groups[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ]);

//       if (topics.length === 0) {
//         throw new Error('Не удалось создать темы');
//       }

//       // Создание карточек для английского языка
//       const cards = await Card.bulkCreate([
//         // Знакомство
//         {
//           value: 'Hello',
//           translation: 'Привет',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Goodbye',
//           translation: 'До свидания',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Please',
//           translation: 'Пожалуйста',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Thank you',
//           translation: 'Спасибо',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Yes',
//           translation: 'Да',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'No',
//           translation: 'Нет',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Sorry',
//           translation: 'Извините',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Help',
//           translation: 'Помогите',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           value: 'See you later',
//           translation: 'Увидимся позже',
//           topicId: topics[0].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Путешествия англ
//         {
//           value: 'Travel',
//           translation: 'Путешествовать',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Flight',
//           translation: 'Рейс',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Hotel',
//           translation: 'Отель',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Passport',
//           translation: 'Паспорт',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Luggage',
//           translation: 'Багаж',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Map',
//           translation: 'Карта',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Ticket',
//           translation: 'Билет',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Guide',
//           translation: 'Гид',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Journey',
//           translation: 'Путешествие',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Adventure',
//           translation: 'Приключение',
//           topicId: topics[1].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Животные
//         {
//           value: 'Dog',
//           translation: 'Собака',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Cat',
//           translation: 'Кошка',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Bird',
//           translation: 'Птица',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Fish',
//           translation: 'Рыба',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Horse',
//           translation: 'Лошадь',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Elephant',
//           translation: 'Слон',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Lion',
//           translation: 'Лев',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           value: 'Bear',
//           translation: 'Медведь',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Rabbit',
//           translation: 'Кролик',
//           topicId: topics[3].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Погода
//         {
//           value: 'Sunny',
//           translation: 'Солнечно',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Rainy',
//           translation: 'Дождливо',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Cloudy',
//           translation: 'Облачно',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Windy',
//           translation: 'Ветреный',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Snowy',
//           translation: 'Снежно',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Stormy',
//           translation: 'Шторм',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Hot',
//           translation: 'Жарко',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Cold',
//           translation: 'Холодно',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Humid',
//           translation: 'Влажно',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Foggy',
//           translation: 'Туманно',
//           topicId: topics[4].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Веб-разработка

//         {
//           value: 'Frontend',
//           translation: 'Фронтенд',
//           topicId: topics[5].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Backend',
//           translation: 'Бэкенд',
//           topicId: topics[5].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Database',
//           translation: 'База данных',
//           topicId: topics[5].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Server',
//           translation: 'Сервер',
//           topicId: topics[5].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Framework',
//           translation: 'Фреймворк',
//           topicId: topics[5].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'API',
//           translation: 'API',
//           topicId: topics[5].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Debugging',
//           translation: 'Отладка',
//           topicId: topics[5].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Еда англ
//         {
//           value: 'Food',
//           translation: 'Еда',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Water',
//           translation: 'Вода',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Bread',
//           translation: 'Хлеб',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Fruit',
//           translation: 'Фрукты',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Vegetables',
//           translation: 'Овощи',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Meat',
//           translation: 'Мясо',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Fish',
//           translation: 'Рыба',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Dessert',
//           translation: 'Десерт',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Breakfast',
//           translation: 'Завтрак',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Dinner',
//           translation: 'Ужин',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Melow',
//           translation: 'Дыня',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Pear',
//           translation: 'Груша',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Apple',
//           translation: 'Яблоко',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Plate',
//           translation: 'Тарелка',
//           topicId: topics[2].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Знакомство
//         {
//           value: 'Ciao',
//           translation: 'Привет',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Arrivederci',
//           translation: 'До свидания',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Per favore',
//           translation: 'Пожалуйста',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Grazie',
//           translation: 'Спасибо',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Sì',
//           translation: 'Да',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'No',
//           translation: 'Нет',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Mi scuso',
//           translation: 'Извините',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Aiuto',
//           translation: 'Помогите',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Ti amo',
//           translation: 'Я тебя люблю',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'A presto',
//           translation: 'Увидимся позже',
//           topicId: topics[6].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // погода ит

//         {
//           value: 'Soleggiato',
//           translation: 'Солнечно',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Piovoso',
//           translation: 'Дождливо',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Nuvoloso',
//           translation: 'Облачно',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Ventoso',
//           translation: 'Ветреный',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Nevoso',
//           translation: 'Снежно',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Tempestoso',
//           translation: 'Шторм',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Caldo',
//           translation: 'Жарко',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Freddo',
//           translation: 'Холодно',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Umido',
//           translation: 'Влажно',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Nebbioso',
//           translation: 'Туманно',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Caldo torrido',
//           translation: 'Жаркая погода',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Gela',
//           translation: 'Морозно',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Tempesta di neve',
//           translation: 'Снежная буря',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Cielo sereno',
//           translation: 'Ясное небо',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Burrasca',
//           translation: 'Штормовой ветер',
//           topicId: topics[8].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Путешествия
//         {
//           value: 'Viaggio',
//           translation: 'Путешествовать',
//           topicId: topics[7].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Volo',
//           translation: 'Рейс',
//           topicId: topics[7].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Hotel',
//           translation: 'Отель',
//           topicId: topics[7].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Passaporto',
//           translation: 'Паспорт',
//           topicId: topics[7].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Bagaglio',
//           translation: 'Багаж',
//           topicId: topics[7].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Mappa',
//           translation: 'Карта',
//           topicId: topics[7].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Biglietto',
//           translation: 'Билет',
//           topicId: topics[7].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Viaggio',
//           translation: 'Путешествие',
//           topicId: topics[7].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Животные
//         {
//           value: 'Cane',
//           translation: 'Собака',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Gatto',
//           translation: 'Кошка',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Uccello',
//           translation: 'Птица',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Pesce',
//           translation: 'Рыба',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Cavallo',
//           translation: 'Лошадь',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Elefante',
//           translation: 'Слон',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Leone',
//           translation: 'Лев',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Orso',
//           translation: 'Медведь',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Coniglio',
//           translation: 'Кролик',
//           topicId: topics[9].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Погода
//         {
//           value: 'Soleggiato',
//           translation: 'Солнечно',
//           topicId: topics[10].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Piovoso',
//           translation: 'Дождливо',
//           topicId: topics[10].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Nuvoloso',
//           translation: 'Облачно',
//           topicId: topics[10].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Ventoso',
//           translation: 'Ветреный',
//           topicId: topics[10].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Nevoso',
//           translation: 'Снежно',
//           topicId: topics[10].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           value: 'Caldo',
//           translation: 'Жарко',
//           topicId: topics[10].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Freddo',
//           translation: 'Холодно',
//           topicId: topics[10].id,
//           authorId: users[0].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Знакомство чувашский
//         {
//           value: 'Сӑн',
//           translation: 'Привет',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Кӑтӑр',
//           translation: 'До свидания',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Пӗрлӗ',
//           translation: 'Пожалуйста',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Рахмат',
//           translation: 'Спасибо',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Эн',
//           translation: 'Да',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Юк',
//           translation: 'Нет',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Кӑнӑ',
//           translation: 'Извините',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Ярдам',
//           translation: 'Помогите',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Сӑнӗн',
//           translation: 'Я тебя люблю',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Кӑтӑрма',
//           translation: 'Увидимся позже',
//           topicId: topics[11].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Знакомство
//         {
//           value: 'Hola',
//           translation: 'Привет',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Adiós',
//           translation: 'До свидания',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Por favor',
//           translation: 'Пожалуйста',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Gracias',
//           translation: 'Спасибо',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Sí',
//           translation: 'Да',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'No',
//           translation: 'Нет',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Lo siento',
//           translation: 'Извините',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Ayuda',
//           translation: 'Помогите',
//           topicId: topics[6].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Te amo',
//           translation: 'Я тебя люблю',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Hasta luego',
//           translation: 'Увидимся позже',
//           topicId: topics[12].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Еда
//         {
//           value: 'Comida',
//           translation: 'Еда',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Agua',
//           translation: 'Вода',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Pan',
//           translation: 'Хлеб',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Fruta',
//           translation: 'Фрукты',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Verdura',
//           translation: 'Овощи',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Carne',
//           translation: 'Мясо',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Pescado',
//           translation: 'Рыба',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Postre',
//           translation: 'Десерт',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Cena',
//           translation: 'Ужин',
//           topicId: topics[14].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Путешествия
//         {
//           value: 'Viajar',
//           translation: 'Путешествовать',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Vuelo',
//           translation: 'Рейс',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Hotel',
//           translation: 'Отель',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Pasaporte',
//           translation: 'Паспорт',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Equipaje',
//           translation: 'Багаж',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Mapa',
//           translation: 'Карта',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Boleto',
//           translation: 'Билет',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Guía',
//           translation: 'Гид',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           value: 'Aventura',
//           translation: 'Приключение',
//           topicId: topics[13].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Животные
//         {
//           value: 'Perro',
//           translation: 'Собака',
//           topicId: topics[15].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Gato',
//           translation: 'Кошка',
//           topicId: topics[15].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Pájaro',
//           translation: 'Птица',
//           topicId: topics[15].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Pez',
//           translation: 'Рыба',
//           topicId: topics[15].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Caballo',
//           translation: 'Лошадь',
//           topicId: topics[15].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Elefante',
//           translation: 'Слон',
//           topicId: topics[15].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'León',
//           translation: 'Лев',
//           topicId: topics[15].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         // Погода
//         {
//           value: 'Soleado',
//           translation: 'Солнечно',
//           topicId: topics[16].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Ventoso',
//           translation: 'Ветреный',
//           topicId: topics[16].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Nevado',
//           translation: 'Снежно',
//           topicId: topics[16].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },

//         {
//           value: 'Calor',
//           translation: 'Жарко',
//           topicId: topics[16].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Frío',
//           translation: 'Холодно',
//           topicId: topics[16].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           value: 'Húmedo',
//           translation: 'Влажно',
//           topicId: topics[16].id,
//           authorId: users[1].id,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ]);

//       if (cards.length === 0) {
//         throw new Error('Не удалось создать карточки');
//       }

//       // const progresses = await Progress.bulkCreate([
//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[0].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[10].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[15].id,
//       //     isOpened: true,
//       //     isStudied: false,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[20].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[30].id,
//       //     isOpened: true,
//       //     isStudied: false,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[40].id,
//       //     isOpened: true,
//       //     isStudied: false,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[45].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[12].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[90].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[0].id,
//       //     cardId: cards[100].id,
//       //     isOpened: true,
//       //     isStudied: false,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[1].id,
//       //     cardId: cards[115].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[1].id,
//       //     cardId: cards[111].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       //   {
//       //     userId: users[1].id,
//       //     cardId: cards[112].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       //   {
//       //     userId: users[1].id,
//       //     cardId: cards[116].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },

//       //   {
//       //     userId: users[1].id,
//       //     cardId: cards[135].id,
//       //     isOpened: true,
//       //     isStudied: true,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       //   {
//       //     userId: users[1].id,
//       //     cardId: cards[145].id,
//       //     isOpened: true,
//       //     isStudied: false,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       //   {
//       //     userId: users[1].id,
//       //     cardId: cards[141].id,
//       //     isOpened: true,
//       //     isStudied: false,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       //   {
//       //     userId: users[1].id,
//       //     cardId: cards[142].id,
//       //     isOpened: true,
//       //     isStudied: false,
//       //     createdAt: new Date(),
//       //     updatedAt: new Date(),
//       //   },
//       // ]);

//       // if (progresses.length === 0) {
//       //   throw new Error('Не удалось создать прогресс');
//       // }
//     } catch (error) {
//       console.error(
//         '----------------------------------------------Error seeding data:',
//         error,
//       );
//       throw error; // Прекращаем выполнение при ошибке
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     // Удаление зависимостей в UserGroups
//     await queryInterface.bulkDelete('UserGroups', null, {});

//     // // Удаление зависимостей в Progresses
//     // await queryInterface.bulkDelete('Progresses', null, {});

//     // Удаление карточек
//     await queryInterface.bulkDelete('Cards', null, {});

//     // Удаление тем
//     await queryInterface.bulkDelete('Topics', null, {});

//     // Удаление языков
//     await queryInterface.bulkDelete('Languages', null, {});

//     // Удаление групп
//     await queryInterface.bulkDelete('Groups', null, {});

//     // Удаление пользователей
//     await queryInterface.bulkDelete('Users', null, {});
//   },
// };
