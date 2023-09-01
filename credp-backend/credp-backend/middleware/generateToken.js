require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = async (res, data) => {
  try {
    const token = jwt.sign(
      {
        id: data.id,
        email: data.email,
        role: data.role,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME,
      }
    );
    return token;
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




module.exports = { generateToken };
