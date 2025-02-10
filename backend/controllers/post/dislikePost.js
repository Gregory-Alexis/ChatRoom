const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const dislikePost = async (req, res) => {
  try {
    const { postID } = req.params;
    const userID = req.userID;

    const dislikePostExist = await prisma.dislikePost.findUnique({
      where: {
        userId_postId: { userId: userID, postId: postID },
      },
    });

    if (dislikePostExist) {
      return res.status(400).json({ success: false, message: 'You already dislike this post' });
    }

    await prisma.likePost.deleteMany({
      where: { userId: userID, postId: postID },
    });

    const dislike = await prisma.dislikePost.create({
      data: {
        userId: userID,
        postId: postID,
      },
    });

    return res.status(201).json({ success: true, message: 'Post successfully dislike', dislike });
  } catch (error) {
    console.error('Error liking post:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = dislikePost;
