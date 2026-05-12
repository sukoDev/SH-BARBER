require('reflect-metadata');
require('dotenv').config();

const { DataSource } = require('typeorm');
const Producto = require('./entities/Producto');
const Usuario = require('./entities/Usuario');

const parseBoolean = (value) => value === 'true' || value === '1';

const shouldSynchronize =
    process.env.TYPEORM_SYNCHRONIZE !== undefined
        ? parseBoolean(process.env.TYPEORM_SYNCHRONIZE)
        : process.env.NODE_ENV !== 'production';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'sh_barber_db',
    synchronize: shouldSynchronize,
    logging: parseBoolean(process.env.TYPEORM_LOGGING),
    entities: [Producto, Usuario],
    migrations: [`${__dirname}/migrations/*.js`],
});

module.exports = AppDataSource;
