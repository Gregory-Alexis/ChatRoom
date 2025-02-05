const express = require('express');

const authController = require('../controllers/user/index');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);

module.exports = userRouter;
