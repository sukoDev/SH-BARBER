const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppDataSource = require('../db/data-source');
const Usuario = require('../db/entities/Usuario');

const buildPublicUser = (usuario) => ({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    role: usuario.role,
});

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y contrasena son obligatorios',
            });
        }

        const usuarioRepository = AppDataSource.getRepository(Usuario);
        const usuario = await usuarioRepository.findOne({
            where: {
                email: email.trim().toLowerCase(),
                activo: true,
            },
        });

        if (!usuario) {
            return res.status(401).json({
                message: 'Credenciales incorrectas',
            });
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.passwordHash);

        if (!passwordCorrecta) {
            return res.status(401).json({
                message: 'Credenciales incorrectas',
            });
        }

        const token = jwt.sign(
            {
                sub: usuario.id,
                email: usuario.email,
                role: usuario.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES || '1d',
            }
        );

        res.json({
            token,
            user: buildPublicUser(usuario),
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            message: 'Error al iniciar sesion',
        });
    }
};

const me = (req, res) => {
    res.json({
        user: buildPublicUser(req.user),
    });
};

module.exports = {
    login,
    me,
};
