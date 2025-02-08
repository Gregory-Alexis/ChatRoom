const express = require('express');

const postController = require('../controllers/post/index');
const verifyToken = require('../middlewares/verifyToken');

const postRouter = express.Router();

postRouter.get('/', postController.getPosts);
postRouter.post('/create', verifyToken, postController.createPost);
postRouter.delete('/delete/:postID', verifyToken, postController.deletePost);

module.exports = postRouter;
