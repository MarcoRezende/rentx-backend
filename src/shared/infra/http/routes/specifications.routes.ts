import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/use-cases/create-specification/create-specification.controller';
import { ListSpecificationsController } from '@modules/cars/use-cases/list-specifications/list-specifications.controller';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensure-admin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRouter.get('/', listSpecificationsController.handle);

export { specificationsRouter };
