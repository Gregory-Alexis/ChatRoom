const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        likePosts: true,
        dislikePosts: true,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = getPosts;
