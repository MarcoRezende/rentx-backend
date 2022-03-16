import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { passwordRouter } from './password.routes';
import { rentalsRouter } from './rentals.routes';
import { specificationsRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

export const router = Router();

/**
 * configurando aqui, não precisamos reescrever
 * o recurso novamente no router em questão.
 */
router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);
router.use('/cars', carsRouter);
router.use('/users', usersRouter);
router.use('/rentals', rentalsRouter);
router.use('/password', passwordRouter);
/**
 * acessa direto a rota /sessions
 */
router.use(authenticateRouter);
