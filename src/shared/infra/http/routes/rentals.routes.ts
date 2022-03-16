import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/use-cases/create-rental/create-rental.controller';
import { DevolutionRentalController } from '@modules/rentals/use-cases/devolution-rental/devolution-rental.controller';
import { ListRentalsController } from '@modules/rentals/use-cases/list-rentals/list-rentals.controller';

import { ensureAdmin } from '../middlewares/ensure-admin';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsController = new ListRentalsController();

rentalsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createRentalController.handle
);

rentalsRouter.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalsRouter.post('/user', ensureAuthenticated, listRentalsController.handle);

export { rentalsRouter };
