const express = require('express');

const authController = require('../controllers/user/index');
const verifyToken = require('../middlewares/verifyToken');

const userRouter = express.Router();

userRouter.get('/check-auth', verifyToken, authController.checkAuth);
userRouter.delete('/delete/user/:userID', verifyToken, authController.deleteUser);

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logout);

module.exports = userRouter;
