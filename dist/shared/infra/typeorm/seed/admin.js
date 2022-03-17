"use strict";

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * database seeding is populating a database with an initial set of data
 *
 * we've created one to generate a admin user.
 */
async function create() {
  /**
   * since there's a problem when using Docker and Typeorm to
   * create connections, we have to set host as localhost in here.
   */
  const connection = await (0, _index.default)('localhost');
  const password = await (0, _bcrypt.hash)('admin', 8);
  await connection.query(`INSERT INTO 
      users (id, name, email, password, "isAdmin", "createdAt", "driverLicense") 
      VALUES ('${(0, _uuid.v4)()}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`);
}

create().then(() => console.log('Admin created'));