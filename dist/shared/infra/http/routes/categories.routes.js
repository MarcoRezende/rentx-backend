"use strict";

exports.__esModule = true;
exports.categoriesRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _createCategory = require("../../../../modules/cars/use-cases/create-category/create-category.controller");

var _importCategory = require("../../../../modules/cars/use-cases/import-category/import-category.controller");

var _listCategories = require("../../../../modules/cars/use-cases/list-categories/list-categories.controller");

var _ensureAdmin = require("../middlewares/ensure-admin");

var _ensureAuthenticated = require("../middlewares/ensure-authenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRouter = (0, _express.Router)();
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

exports.categoriesRouter = categoriesRouter;
const upload = (0, _multer.default)({
  dest: './tmp'
});
const createCategoryController = new _createCategory.CreateCategoryController();
const imporCategoryController = new _importCategory.ImportCategoryController();
const lisCategoriesController = new _listCategories.ListCategoriesController();
/**
 * começaremos a dividir nossa aplicação em rotas, de acordo com as tabelas
 * existentes no banco que ainda será configurado.
 */

categoriesRouter.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle);
/**
 * configuramos o multer (upload) como um middleware, sendo
 * o valor definido o nome do parametro dentro de request.
 */

categoriesRouter.post('/import', upload.single('file'), _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, imporCategoryController.handle);
categoriesRouter.get('/', lisCategoriesController.handle);