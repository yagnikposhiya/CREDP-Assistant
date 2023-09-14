const util = require('util');
const multer = require('multer');
const path = require('path');

const maxSize = 1 * 1000 * 1000;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../public/files/'));
  },
  // file name : user_id/patient_id/order_id
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now();

    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
    );
  },
});

const fileFilter = (_req, file, cb) => {
  if (
    // file.mimetype === "image/jpg" ||
    // file.mimetype === "image/jpeg" ||
    // file.mimetype === "image/png" ||
    // file.mimetype === "application/msword" ||
    file.mimetype === 'application/zip'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of proper type'), false);
  }
};

const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single('file');

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
