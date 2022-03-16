/**
 * simples classe para lidar om erros e manter os mesmos
 * sobre controle.
 */

export class AppError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {}
}
