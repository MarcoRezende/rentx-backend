import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

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
  const connection = await createConnection('localhost');
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO 
      users (id, name, email, password, "isAdmin", "createdAt", "driverLicense") 
      VALUES ('${uuidV4()}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`
  );
}

create().then(() => console.log('Admin created'));
