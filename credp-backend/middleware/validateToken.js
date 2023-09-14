const jwt = require('jsonwebtoken');
const { messages } = require('../utils/messages');
const { statusCodes } = require('../utils/statusCodes');
const { sendMessage } = require('../helper/helpers');
const { fetchStudentByStudentId } = require('../dao/student.dao');
const { findFacultyByFacultyId } = require('../dao/faculty.dao');
const { findAdminByAdminId } = require('../dao/admin.dao');
const { ROLES: {
  STUDENT,
  FACULTY,
  ADMIN,
} } = require('../utils/constant');

const authenticate = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new Error(messages.USER_NOT_LOGIN);
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    } catch (err) {
      throw new Error(messages.SESSION_TIMEOUT);
    }

    // Find user by email - Remaining
    let user;
    if (!payload.email) {
      throw new Error(messages.USER_NOT_FOUND);
    }

    if (payload.role === STUDENT) {
      user = await fetchStudentByStudentId(payload.id);
    } else if (payload.role === FACULTY) {
      user = await findFacultyByFacultyId(payload.id);
    } else if (payload.role === ADMIN) {
      user = await findAdminByAdminId(payload.id);
    }

    if (!user) {
      throw new Error(messages.USER_NOT_FOUND);
    }

    const { role, email } = payload;

    req.token = token;
    req.user = {
      user,
      email,
      role,
    };

    next();
  } catch (err) {
    return sendMessage(
      { code: statusCodes.UNAUTHORIZED.code },
      messages.UNAUTHORIZED,
      statusCodes.UNAUTHORIZED.code,
      res,
    );
  }
};

module.exports = authenticate;
