const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const checkAuth = async (req, res) => {
  const userID = req.userID.toString();
  try {
    if (!userID) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User ID is missing' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log('Error in checkAuth', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = checkAuth;
