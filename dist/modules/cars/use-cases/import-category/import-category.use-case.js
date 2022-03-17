"use strict";

exports.__esModule = true;
exports.ImportCategoryUseCase = void 0;

var _csvParse = _interopRequireDefault(require("csv-parse"));

var _fs = _interopRequireDefault(require("fs"));

var _tsyringe = require("tsyringe");

var _categories = require("../../infra/typeorm/repositories/categories.repository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ImportCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _categories.CategoriesRepository === "undefined" ? Object : _categories.CategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  /**
   * definimos este método para abstrair parte de código e
   * ler o arquivo CSV, devido a isso, é privado.
   */


  loadCategories(file) {
    /**
     * como necessitamos esperar pelos chunks, precisamos
     * que seja uma promise.
     */
    return new Promise((resolve, reject) => {
      const categories = [];
      /**
       * utilizaremos a biblioteca stream para, ao
       * invés de usar o leitor padrão do node,
       * o qual realiza uma operação completa do arquivo,
       * ou seja, download uma unica tacada.
       *
       * com o fs (nativo), podemos usar a função de stream,
       * ou seja, realizar uma operação read ou write por
       * partes (chunks).
       *
       * a medida que são lidos e gravados, abre-se espaço
       * para a reutilização e o não acumulo em memória do
       * que já foi utilizado, isso é limpado, abrindo espaço
       * para os novos chunks sem dar overflow na memória.
       *
       * outro modulo nativo, "stream", é muito poderoso e utilizado
       * em conjunto dos players.
       */

      const stream = _fs.default.createReadStream(file.path);
      /**
       * usaremos csv-parse para tratar o arquivo.
       */


      const parseFile = (0, _csvParse.default)();
      /**
       * o pipe chamará o callback em questão a cada
       * parte do arquivo lido.
       */

      stream.pipe(parseFile);
      parseFile.on('data', async line => {
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      }).on('end', () => {
        _fs.default.promises.unlink(file.path); // remove o arquivo especificado


        resolve(categories);
      }).on('error', err => {
        reject(err);
      });
    });
  }

  async execute(file) {
    const categories = await this.loadCategories(file);
    categories.forEach(({
      name,
      description
    }) => {
      const categoryExist = this.categoriesRepository.findByName(name);

      if (!categoryExist) {
        this.categoriesRepository.create({
          name,
          description
        });
      }
    });
    return categories;
  }

}) || _class) || _class) || _class) || _class);
exports.ImportCategoryUseCase = ImportCategoryUseCase;