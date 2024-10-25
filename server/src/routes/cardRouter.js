const express = require('express');
const { Card, Progress, Language, Topic, User, Sequelize } = require('../../db/models');
const cardRouter = express.Router();
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const sequelize = require('sequelize');

// Получение всех тем с подсчетом количества слов в теме
cardRouter.get('/topics', verifyAccessToken, async (req, res) => {
  try {
    const topics = await Topic.findAll({
      include: [
        {
          model: User,
          attributes: ['userName'],
        },
        {
          model: Card,
          attributes: [],
        },
      ],
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Cards.id')), 'wordCount']],
      },
      group: ['Topic.id', 'User.id'],
    });
    res.json(topics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении тем' });
  }
});

// Создание новой темы
cardRouter.post('/topics', async (req, res) => {
  const { topicName, isPublic, langId, authorId } = req.body;

  try {
    const newTopic = await Topic.create({
      topicName,
      isPublic,
      langId,
      authorId,
    });

    res.status(201).json(newTopic);
  } catch (error) {
    console.error('Ошибка при создании темы:', error);
    res.status(500).json({ error: 'Не удалось создать тему.' });
  }
});

// Создание новой карточки
cardRouter.post('/cards', async (req, res) => {
  const { value, translation, topicId, authorId } = req.body;

  try {
    const newCard = await Card.create({
      value,
      translation,
      topicId,
      authorId,
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error('Ошибка при создании карточки:', error);
    res.status(500).json({ error: 'Не удалось создать карточку.' });
  }
});

// Получение всех языков
cardRouter.get('/languages', async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении языков' });
  }
});

// Получение всех карточек по определенной теме и автору
cardRouter.get('/topics/:topicId/:authorId', async (req, res) => {
  try {
    const { topicId, authorId } = req.params;
    const cards = await Card.findAll({
      where: {
        topicId,
        authorId,
      },
      include: [
        {
          model: Progress,
          attributes: ['isOpened', 'isStudied'],
          where: { userId: req.user.id }, // assuming userId is available in req.user
        },
      ],
    });
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении карточек' });
  }
});

// Обновление прогресса карточки
cardRouter.put('/progress/:userid/:cardid', async (req, res) => {
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

// Отметка карточки как изученной
cardRouter.put('/progress/study/:userid/:cardid', async (req, res) => {
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

    await studiedCard.update({ isStudied: true });
    res.json(studiedCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получение прогресса пользователя по всем темам
cardRouter.get('/progress/:user', async (req, res) => {
  try {
    const userId = req.params.user;
    if (!userId) {
      return res.status(400).json({ message: 'Не передан пользователь' });
    }

    const userTopics = await Topic.findAll({
      where: { authorId: userId },
      attributes: ['id', 'topicName'],
    });

    if (userTopics.length === 0) {
      return res.status(404).json({ message: 'У пользователя нет тем' });
    }

    const userProgress = await Progress.findAll({
      where: { userId },
      include: [
        {
          model: Card,
          attributes: ['topicId'],
          include: [
            {
              model: Topic,
              attributes: ['topicName'],
            },
          ],
        },
      ],
      attributes: [
        [sequelize.fn('count', sequelize.col('Progress.cardId')), 'totalCards'],
        [
          sequelize.fn(
            'sum',
            sequelize.literal('CASE WHEN Progress.isStudied THEN 1 ELSE 0 END'),
          ),
          'cardsStudied',
        ],
        [
          sequelize.fn(
            'sum',
            sequelize.literal('CASE WHEN Progress.isOpened THEN 1 ELSE 0 END'),
          ),
          'cardsOpened',
        ],
      ],
      group: ['Card.topicId', 'Topic.id'],
    });

    const result = userTopics.map((topic) => {
      const progress = userProgress.find((p) => p.Card.topicId === topic.id);
      if (progress) {
        return {
          topicName: topic.topicName,
          totalCards: progress.dataValues.totalCards,
          cardsStudied: progress.dataValues.cardsStudied,
          cardsOpened: progress.dataValues.cardsOpened,
        };
      }
      return {
        topicName: topic.topicName,
        totalCards: 0,
        cardsStudied: 0,
        cardsOpened: 0,
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка сервера' });
  }
});

module.exports = cardRouter;
