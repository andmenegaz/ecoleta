import knex from 'knex'
import knexfile from '../../knexfile'


const environment = process.env.ENVIRONMENT || 'development'
const config = (environment == 'development' ? knexfile.development : knexfile.production)

const connection = knex(config)

let teste = connection('points').select('*');

export default connection;