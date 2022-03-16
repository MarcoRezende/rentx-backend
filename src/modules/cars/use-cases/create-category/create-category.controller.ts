import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./create-category.use-case";

export class CreateCategoryController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    /**
     * após configuramos a classe como injetavel, precisamos
     * resolve-la.
     */
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
