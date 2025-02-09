const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const generateTokenAndSetCookie = require('../../utils/generateTokenAndSetCookie');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'email and password required' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    generateTokenAndSetCookie(res, user.id);

    delete user.password;

    res.status(200).json({ success: true, message: 'logged in successfully', user });
  } catch (error) {
    console.log('Error in login', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = login;
