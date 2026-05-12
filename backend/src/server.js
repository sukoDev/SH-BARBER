const app = require('./app');
const AppDataSource = require('./db/data-source');
const seedAdminUser = require('./db/seeders/admin.seeder');

const PORT = process.env.PORT || 3000;


const startServer = async () => {
    try {
        await AppDataSource.initialize();
        await seedAdminUser();

        app.listen(PORT, () => {
            console.log(`Backend funcionando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar la base de datos con TypeORM:', error);
        process.exit(1);
    }
};

startServer();
