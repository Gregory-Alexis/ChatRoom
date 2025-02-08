const express = require('express');

const postController = require('../controllers/post/index');
const verifyToken = require('../middlewares/verifyToken');

const postRouter = express.Router();

postRouter.post('/create-post', verifyToken, postController.createPost);

module.exports = postRouter;
