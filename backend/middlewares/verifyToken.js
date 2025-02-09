const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }

    req.userID = decoded.userID;

    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
