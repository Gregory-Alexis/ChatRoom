const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const authenticatedUserID = req.userID;

    const user = await prisma.user.findUnique({
      where: { id: userID },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (authenticatedUserID.toString() !== userID.toString()) {
      return res.status(403).json({ message: "You don't have permission to delete this user" });
    }

    await prisma.post.deleteMany({
      where: { authorId: userID },
    });

    await prisma.user.delete({
      where: { id: userID },
    });

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = deleteUser;
