const express = require('express');

const authController = require('../controllers/user/index');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logout);

module.exports = userRouter;
