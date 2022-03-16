export class BaseInMemoryRepository<Entity> {
  async findById(id: string, entities: Entity[]): Promise<Entity | undefined> {
    return entities.find((entity) => (<any>entity).id === id);
  }
}
