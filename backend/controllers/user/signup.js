const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const generateTokenAndSetCookie = require('../../utils/generateTokenAndSetCookie');

const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All field are required' });
    }

    const isUserAlreadyExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({ success: false, message: 'That user already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },

      omit: {
        password: true,
      },
    });

    generateTokenAndSetCookie(res, user.id);

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = signup;
