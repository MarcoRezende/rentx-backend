import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
/**
 * necessario para que o node consiga tratar erros assincronos.
 */
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import { AppError } from '@shared/errors/app-error';
/** importa o arquivo que inicia a conexão com o banco de dados */
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import '../../container';
import { router } from './routes';

createConnection();

const app = express();

app.use(express.json());

/**
 * utilizaremos o swagger para criar a documentação da nossa
 * api de forma manual, atraves de 'swagger.json'
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use(cors());

app.use(router);

/**
 * após importar o "express-async-errors", podemos criar esse middleware
 * basico para lidar com erros "jogados" (`throw new AppError`).
 */
app.use(
  (err: Error, _request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
