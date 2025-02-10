const express = require('express');

const postController = require('../controllers/post/index');
const verifyToken = require('../middlewares/verifyToken');

const postRouter = express.Router();

postRouter.get('/', postController.getPosts);

postRouter.post('/create', verifyToken, postController.createPost);
postRouter.post('/create/like-post/:postID', verifyToken, postController.likePost);
postRouter.post('/create/dislike-post/:postID', verifyToken, postController.dislikePost);

postRouter.delete('/delete/:postID', verifyToken, postController.deletePost);

postRouter.put('/update/:postID', verifyToken, postController.updatePost);

module.exports = postRouter;
