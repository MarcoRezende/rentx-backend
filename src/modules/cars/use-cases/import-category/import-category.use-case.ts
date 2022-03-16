import csvParse from 'csv-parse';
import fileSystem from 'fs';
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../infra/typeorm/repositories/categories.repository';

interface IImportCategory {
  name: string;
  description: string;
}

type CSVline = [string, string];

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) {}

  /**
   * definimos este método para abstrair parte de código e
   * ler o arquivo CSV, devido a isso, é privado.
   */
  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    /**
     * como necessitamos esperar pelos chunks, precisamos
     * que seja uma promise.
     */
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
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
      const stream = fileSystem.createReadStream(file.path);

      /**
       * usaremos csv-parse para tratar o arquivo.
       */
      const parseFile = csvParse();

      /**
       * o pipe chamará o callback em questão a cada
       * parte do arquivo lido.
       */
      stream.pipe(parseFile);

      parseFile
        .on('data', async (line: CSVline) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fileSystem.promises.unlink(file.path); // remove o arquivo especificado
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<IImportCategory[]> {
    const categories = await this.loadCategories(file);

    categories.forEach(({ name, description }) => {
      const categoryExist = this.categoriesRepository.findByName(name);

      if (!categoryExist) {
        this.categoriesRepository.create({ name, description });
      }
    });

    return categories;
  }
}
