import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarSpecificationsController } from '@modules/cars/use-cases/create-car-specifications/create-car-specifications.controller';
import { CreateCarController } from '@modules/cars/use-cases/create-car/create-car.controller';
import { ListAvailableCarsController } from '@modules/cars/use-cases/list-available-cars/list-available-cars.controller';
import { UploadCarImagesController } from '@modules/cars/use-cases/upload-car-images/upload-car-images.controller';

import { ensureAdmin } from '../middlewares/ensure-admin';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

const carsRouter = Router();

const createCarController = new CreateCarController();
const createCarSpecificationsController =
  new CreateCarSpecificationsController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get('/available', listAvailableCarsController.handle);

carsRouter.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle
);

carsRouter.post(
  '/:id/images',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle
);

export { carsRouter };
