import { Category } from '../infra/typeorm/entities/category.entity';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

/**
 * Usamos esta interface como contrato com outros repositorios,
 * seguindo o principio L(iksov Substitution Principle, ou LSP), onde
 * uma subtipo B de um tipo A deve substituir A sem causas erros.
 *
 * Se futuramente alterarmos o DBMS, contanto que o mesmo implemente e
 * siga o contrato, não haverá problemas.
 */
export interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
}
