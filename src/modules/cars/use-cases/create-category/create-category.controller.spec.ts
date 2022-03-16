import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO 
      users (id, name, email, password, "isAdmin", "createdAt", "driverLicense") 
      VALUES ('${uuidV4()}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`
    );
  });

  /**
   * remove o banco de dados e fecha a conexão
   * uma vez que não necessitamos usa-la apos os
   * os testes
   */
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a category', async () => {
    const session = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = session.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category',
        description: 'Category description',
      })
      .set({
        Authorization: 'Bearer ' + token,
      });

    expect(response.statusCode).toBe(201);
  });

  it('should not be able to create a duplicated category', async () => {
    const session = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = session.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category',
        description: 'Category description',
      })
      .set({
        Authorization: 'Bearer ' + token,
      });

    expect(response.statusCode).toBe(400);
  });
});
