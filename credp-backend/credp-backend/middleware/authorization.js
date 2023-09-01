const { sendMessage } = require('../helper/helpers');
const {
  ROLES: {
    STUDENT,
    FACULTY,
    ADMIN,
    SUPERADMIN,
  },
} = require('../utils/constant');
const { messages } = require('../utils/messages');
const { statusCodes } = require('../utils/statusCodes');

const adminAuthorization = async (req, res, next) => {
  try {
    if (req.user.role === ADMIN) {
      next();
    } else {
      return sendMessage(
        { code: statusCodes.NON_AUTHORITATIVE_INFORMATION.code },
        messages.LOGIN_AS_ADMIN,
        statusCodes.NON_AUTHORITATIVE_INFORMATION.code,
        res,
      );
    }
  } catch (err) {
    return sendMessage(
      { code: statusCodes.UNAUTHORIZED.code },
      statusCodes.UNAUTHORIZED.desc,
      statusCodes.UNAUTHORIZED.code,
      res,
    );
  }
};

const facultyAuthorization = async (req, res, next) => {
  try {
    if (req.user.role === FACULTY) {
      next();
    } else {
      return sendMessage(
        { code: statusCodes.NON_AUTHORITATIVE_INFORMATION.code },
        messages.LOGIN_AS_FACULTY,
        statusCodes.NON_AUTHORITATIVE_INFORMATION.code,
        res,
      );
    }
  } catch (err) {
    return sendMessage(
      { code: statusCodes.UNAUTHORIZED.code },
      statusCodes.UNAUTHORIZED.desc,
      statusCodes.UNAUTHORIZED.code,
      res,
    );
  }
};

const studentAuthorization = async (req, res, next) => {
  try {
    if (req.user.role === STUDENT) {
      next();
    } else {
      return sendMessage(
        { code: statusCodes.NON_AUTHORITATIVE_INFORMATION.code },
        messages.USER_NOT_LOGIN,
        statusCodes.NON_AUTHORITATIVE_INFORMATION.code,
        res,
      );
    }
  } catch (err) {
    return sendMessage(
      { code: statusCodes.UNAUTHORIZED.code },
      statusCodes.UNAUTHORIZED.desc,
      statusCodes.UNAUTHORIZED.code,
      res,
    );
  }
};

module.exports = {
  adminAuthorization,
  facultyAuthorization,
  studentAuthorization,
};
