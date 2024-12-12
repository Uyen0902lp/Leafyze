
import multer from 'multer';
import path from 'path';
import ApiError from '../errors/ApiError';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E4);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|jpeg|webp/;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new ApiError(400,"Must be a png/jpg/jpeg/webp image"));
    }
  },
  limits: {
    fileSize: 20 * 1024 * 1024,
  }
});

export default uploader;

