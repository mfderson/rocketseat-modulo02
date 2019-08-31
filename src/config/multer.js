import multer from 'multer';
import crypto from 'crypto';

// extname: retorna extensão arquivo
// resolve: percorrer caminha dentro da aplicação
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // Primeiro parâmetro do callback é null, pois não deu erro
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
