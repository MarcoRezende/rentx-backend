import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/use-cases/create-category/create-category.controller';
import { ImportCategoryController } from '@modules/cars/use-cases/import-category/import-category.controller';
import { ListCategoriesController } from '@modules/cars/use-cases/list-categories/list-categories.controller';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensure-admin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

const categoriesRouter = Router();
/**
 * utilizaremos o multer para upload de arquivos.
 *
 * atraves dele podemos upar um ou mais arquivos,
 * sendo o mesmo utilizado como middleware.
 *
 * abaixo, configuramos uma pasta temporaria
 * para o qual armazenaremos o arquivo para posterior
 * leitura, uso, então deleção.
 *
 * lembrando que esta pasta deve estar paralela
 * a ./src
 */
const upload = multer({ dest: './tmp' });
const createCategoryController = new CreateCategoryController();
const imporCategoryController = new ImportCategoryController();
const lisCategoriesController = new ListCategoriesController();

/**
 * começaremos a dividir nossa aplicação em rotas, de acordo com as tabelas
 * existentes no banco que ainda será configurado.
 */
categoriesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

/**
 * configuramos o multer (upload) como um middleware, sendo
 * o valor definido o nome do parametro dentro de request.
 */
categoriesRouter.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  imporCategoryController.handle
);

categoriesRouter.get('/', lisCategoriesController.handle);

export { categoriesRouter };
