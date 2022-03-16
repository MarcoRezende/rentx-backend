import { getManager, ObjectLiteral } from 'typeorm';

export class BaseRepository<Entity extends ObjectLiteral> {
  async findById(id: string, entityTarget?: any): Promise<Entity | undefined> {
    return getManager().findOne(id, entityTarget);
  }
}
