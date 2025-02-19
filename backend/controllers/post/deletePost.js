const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const deletePost = async (req, res) => {
  try {
    const postID = req.params.postID;
    const userID = req.userID.toString();

    const post = await prisma.post.findUnique({
      where: {
        id: postID,
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.authorId !== userID) {
      return res.status(403).json({ message: "You don't have permission to delete this post" });
    }

    await prisma.post.delete({
      where: {
        id: postID,
      },
    });

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = deletePost;
