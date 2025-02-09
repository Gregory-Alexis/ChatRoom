const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const likePost = async (req, res) => {
  const { postID } = req.params;
  const userID = req.userID;

  try {
    const LikePostExist = await prisma.likePost.findUnique({
      where: {
        userId_postId: { userId: userID, postId: postID },
      },
    });

    if (LikePostExist) {
      return res.status(400).json({ success: false, message: 'You already liked this post' });
    }

    await prisma.dislikePost.deleteMany({
      where: { userId_postId: { userId: userID, postId: postID } },
    });

    const like = await prisma.likePost.create({
      data: { userId: userID, postId: postID },
    });

    res.status(201).json({ success: true, message: 'Post liked', like });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = likePost;
