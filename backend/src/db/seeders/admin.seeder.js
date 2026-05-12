const bcrypt = require('bcryptjs');
const AppDataSource = require('../data-source');
const Usuario = require('../entities/Usuario');

const seedAdminUser = async () => {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.warn('ADMIN_EMAIL y ADMIN_PASSWORD no estan configurados. No se creo admin inicial.');
        return;
    }

    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const usuarioExistente = await usuarioRepository.findOne({
        where: { email },
    });

    if (usuarioExistente) {
        if (usuarioExistente.role !== 'admin' || !usuarioExistente.activo) {
            await usuarioRepository.update(usuarioExistente.id, {
                role: 'admin',
                activo: true,
            });
        }

        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin = usuarioRepository.create({
        nombre: 'Administrador',
        email,
        passwordHash,
        role: 'admin',
        activo: true,
    });

    await usuarioRepository.save(admin);
    console.log(`Admin inicial creado: ${email}`);
};

module.exports = seedAdminUser;
