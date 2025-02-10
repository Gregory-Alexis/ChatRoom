const createPost = require('./createPost');
const deletePost = require('./deletePost');
const dislikePost = require('./dislikePost');
const getPosts = require('./getPost');
const likePost = require('./likePost');
const updatePost = require('./updatePost');

module.exports = { createPost, getPosts, deletePost, updatePost, likePost, dislikePost };
