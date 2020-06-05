import path from 'path'

const config = {
  'development': {
    client: 'mssql',
    connection: {
        host: 'localhost',
        user: 'ecoleta',
        password: 'zxc987mnb',
        database: 'ecoleta'
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'mariadb',
      user: 'root',
      password: '',
      database: 'sb2_prod',
    },
    migrations: {
      directory: '../migrations',
      extensions: ['.ts'],
      stub: '../migrationStub.ts',
    },
    dbManager: {
      collate: ['fi_FI.UTF-8', 'utf8_swedish_ci'],
      superUser: 'root',
      superPassword: '',
    },
  },
}

module.exports = config;
export default config;