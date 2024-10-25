const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');

authRouter.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .send({ message: `Fill all fields: email ${email} name ${name} pass ${password}` });

  try {
    const hashPass = await bcrypt.hash(password, 10);
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { userName: name, hashPass },
    });

    if (!created) {
      return res.status(400).json({ text: 'Почта уже используется' });
    }

    const user = newUser.get();
    delete user.hashPass;
    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig)
      .json({ accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'Fill fields' });
  }

  const targetUser = await User.findOne({ where: { email } });
  if (!targetUser) {
    return res.status(400).json({ text: 'Неверный email' });
  }
  const isValid = await bcrypt.compare(password, targetUser.hashPass);
  if (!isValid) {
    return res.status(400).json({ text: 'Неверный пароль' });
  }

  const user = targetUser.get();
  delete user.hashPass;
  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieConfig)
    .json({ accessToken, user });
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').status(200).send('Logout successfull!');
});

module.exports = authRouter;
