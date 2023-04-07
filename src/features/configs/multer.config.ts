import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const MulterConfig: MulterModuleOptions = {
  storage: diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, './uploads');
    // },
    filename: (req, file, cb) => {
      const newName = Date.now() + '-' + file.originalname;
      cb(null, newName);
    },
  }),
  // storage: diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1500000,
  },
};
