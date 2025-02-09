const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userID = req.userID;

    if (!content) {
      return res.status(400).json({ success: false, message: 'content is required' });
    }

    if (!userID) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userID },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const post = await prisma.post.create({
      data: {
        content,
        author: { connect: { id: userID } },
      },
    });

    return res.status(201).json({ success: true, post });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = createPost;
