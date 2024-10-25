const express = require('express');
const {
  Card,
  Progress,
  Language,
  Topic,
  User,
  Sequelize,
  UserGroup,
  Group,
} = require('../../db/models');
const groupRouter = express.Router();
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const sequelize = require('sequelize');

groupRouter.route('/groups/add').post(verifyAccessToken, async (req, res) => {
  const { groupName, userId } = req.body;
  const group = await Group.create({ groupName, userId });
  res.json(group);
});

groupRouter.route('/groups/:userId').get(async (req, res) => {
  try {
    const { userId } = req.params;
    const groups = await Group.findAll({
      where: { userId },
      attributes: ['id', 'groupName'], // Укажите атрибуты, которые нужно вернуть
    });
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при получении групп' });
  }
});

groupRouter.route('/groups/:groupId/addUser').post(async (req, res) => {
  try {
    const { userId } = req.body;
    const { groupId } = req.params;

    // Проверьте, существует ли уже связь между пользователем и группой
    const existingRelation = await UserGroup.findOne({
      where: { userId, groupId },
    });

    if (existingRelation) {
      return res.status(400).json({ message: 'Пользователь уже добавлен в группу' });
    }

    // Создайте новую связь в таблице UserGroup
    const userGroup = await UserGroup.create({ userId, groupId });
    res.json(userGroup);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Произошла ошибка при добавлении пользователя в группу' });
  }
});

groupRouter.route('/groups/:groupId/users').get(async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, {
      include: [{ model: User, attributes: ['id', 'userName'] }],
    });
    if (!group) {
      return res.status(404).json({ message: 'Группа не найдена' });
    }
    res.json(group.Users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Произошла ошибка при получении пользователей группы' });
  }
});

groupRouter.route('/groups/:groupId/topics').post(async (req, res) => {
  try {
    const { groupId } = req.params;
    const { topicName, isPublic, langId, authorId } = req.body;
    const topic = await Topic.create({
      topicName,
      isPublic,
      langId,
      authorId,
      groupId,
    });
    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при создании темы' });
  }
});

groupRouter.route('/groups/:groupId/topics').get(async (req, res) => {
  try {
    const { groupId } = req.params;
    const topics = await Topic.findAll({
      where: { groupId },
      attributes: ['id', 'topicName'],
    });
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при получении тем' });
  }
});

groupRouter.route('/topics/:topicId/cards').post(async (req, res) => {
  try {
    const { topicId } = req.params;
    const { value, translation, authorId } = req.body;
    const card = await Card.create({
      value,
      translation,
      topicId,
      authorId,
    });
    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при создании карточки' });
  }
});

groupRouter.route('/users/:userId/availableTopics').get(async (req, res) => {
  try {
    const { userId } = req.params;
    // Найти группы, в которые входит пользователь
    const userGroups = await UserGroup.findAll({
      where: { userId },
      attributes: ['groupId'],
    });
    const groupIds = userGroups.map((ug) => ug.groupId);

    // Получить все темы из этих групп
    const topics = await Topic.findAll({
      where: { groupId: groupIds },
      include: [{ model: Card, attributes: ['id', 'value', 'translation'] }],
    });

    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при получении доступных тем' });
  }
});

module.exports = groupRouter;
