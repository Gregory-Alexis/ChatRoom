const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const updatePost = async (req, res) => {
  try {
    const postID = parseInt(req.params.postID);
    const userID = req.userID;
    const { content } = req.body;

    if (isNaN(postID)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const post = await prisma.post.findUnique({
      where: { id: postID },
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.authorId !== userID) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have permission to update this post" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postID },
      data: { content },
    });

    return res
      .status(200)
      .json({ success: true, message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = updatePost;
