const express = require('express');
const { Card, Progress, Language } = require('../..db/models');
const cardRouter = express.Router();
const Topic = require('../../db/models/topic');

// Все темы
cardRouter.route('/topics').get(async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.json(topics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении тем' });
  }
});

// Все языки
cardRouter.route('/languages').get(async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении языков' });
  }
});

// Все карточки по определенной теме
cardRouter.route('/topics/:topicId').get(async (req, res) => {
  try {
    const cards = await Card.findAll({
      where: { topicId: req.params.topicId },
      include: [Progress],
    });
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении карточек' });
  }
});

// Обработчик для обновления прогресса карточки или создания новой
cardRouter.route(verifyAccessToken, '/progress/:userid/:cardid').put(async (req, res) => {
  try {
    const { userid, cardid } = req.params;

    let openCard = await Progress.findOne({
      where: { cardid, userid },
    });

    if (!openCard) {
      openCard = await Progress.create({
        cardid,
        userid,
        isOpened: true,
        isStudied: false,
      });
      return res.status(201).json({ message: 'Карточка создана', openCard });
    }

    await openCard.update({ isOpened: true });
    res.json(openCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка' });
  }
});

// Обработчик для отметки карточки как изученной
cardRouter
  .route(verifyAccessToken, '/progress/study/:userid/:cardid')
  .put(async (req, res) => {
    try {
      const { userid, cardid } = req.params;

      const studiedCard = await Progress.findOne({
        where: { cardid, userid },
      });

      if (!studiedCard) {
        return res
          .status(404)
          .json({ message: 'Карточка не найдена для данного пользователя' });
      }

      // Обновляем статус на "изучена"
      await studiedCard.update({ isStudied: true });
      res.json(studiedCard);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

module.exports = cardRouter;
