"use strict";

var _bcrypt = require("bcrypt");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const password = await (0, _bcrypt.hash)('admin', 8);
    await connection.query(`INSERT INTO 
      users (id, name, email, password, "isAdmin", "createdAt", "driverLicense") 
      VALUES ('${(0, _uuid.v4)()}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`);
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
    const session = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin'
    });
    const {
      token
    } = session.body;
    const response = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category',
      description: 'Category description'
    }).set({
      Authorization: 'Bearer ' + token
    });
    expect(response.statusCode).toBe(201);
  });
  it('should not be able to create a duplicated category', async () => {
    const session = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin'
    });
    const {
      token
    } = session.body;
    const response = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category',
      description: 'Category description'
    }).set({
      Authorization: 'Bearer ' + token
    });
    expect(response.statusCode).toBe(400);
  });
});