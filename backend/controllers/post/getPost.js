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

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = getPosts;
