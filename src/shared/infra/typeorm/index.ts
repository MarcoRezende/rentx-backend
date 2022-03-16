import { createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_ignite') => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      /**
       * host e database configurados de acordo
       * com o ambiente.
       *
       * quando em desenvolvimento, é importante usar um
       * banco para testes
       *
       * a variável NODE_ENV foi setada para `test`
       * junto com o script do jest
       */
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    })
  );
};
