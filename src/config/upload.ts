import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

/**
 * usaremos um provider local para
 * testes, o qual utilizará esta pasta.
 */
const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileName = `${crypto.randomBytes(16).toString('hex')}-${
        file.originalname
      }`;

      return callback(null, fileName);
    },
  }),
};
