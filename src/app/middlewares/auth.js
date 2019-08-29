import jwt from 'jsonwebtoken';

// Pega um função de callback (síncrona) e permite utilizar o async await
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provide' });
  }

  // A desestruturação dessa forma, descarta o primeiro argumento
  // e pega apenas o segundo
  const [, token] = authHeader.split(' ');

  try {
    // promisify(jwt.verify) retorna uma função, logo tenho que passar os parâme
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
