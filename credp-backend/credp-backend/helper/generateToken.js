require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = async (res, data) => {
  try {
    const token = jwt.sign(
      data,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME,
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 30 days
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { generateToken };
