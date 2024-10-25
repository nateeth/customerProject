'use strict';

const { User, Language, Topic, Card } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Создание пустых пользователей
      const users = await User.bulkCreate([], { returning: true });
      console.log('Созданные пользователи:', users);

      // Создание пустых языков (если у вас есть соответствующая модель)
      const languages = await Language.bulkCreate([], { returning: true });
      console.log('Созданные языки:', languages);

      // Создание пустых тем
      const topics = await Topic.bulkCreate([], { returning: true });
      console.log('Созданные темы:', topics);

      // Создание пустых карточек
      const cards = await Card.bulkCreate([], { returning: true });
      console.log('Созданные карточки:', cards);
    } catch (error) {
      console.error(
        '----------------------------------------------Error seeding data:',
        error,
      );
      throw error; // Прекращаем выполнение при ошибке
    }
  },

  async down(queryInterface, Sequelize) {
    // Удаление всех данных из таблиц
    await queryInterface.bulkDelete('Cards', null, {});
    await queryInterface.bulkDelete('Topics', null, {});
    await queryInterface.bulkDelete('Languages', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
