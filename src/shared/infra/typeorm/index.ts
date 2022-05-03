import { createConnection, getConnectionOptions } from 'typeorm';

export default async () => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      /**
       * removemos a configuração de host, pois em produção usaremos o
       * localhost.
       */
      host: process.env.NODE_ENV === 'test',
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    })
  );
};
