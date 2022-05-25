import { createConnection, getConnectionOptions } from 'typeorm';

export default async () => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      /**
       * removemos a configuração de host, pois em produção usaremos o
       * localhost, através do comando docker-compose na instancia do
       * EC2
       */
      host: 'database_ignite',
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    })
  );
};
