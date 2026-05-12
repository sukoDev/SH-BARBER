const jwt = require('jsonwebtoken');
const AppDataSource = require('../db/data-source');
const Usuario = require('../db/entities/Usuario');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'No autenticado',
            });
        }

        const token = authHeader.replace('Bearer ', '').trim();
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const usuarioRepository = AppDataSource.getRepository(Usuario);
        const usuario = await usuarioRepository.findOne({
            where: {
                id: Number(payload.sub),
                activo: true,
            },
        });

        if (!usuario) {
            return res.status(401).json({
                message: 'No autenticado',
            });
        }

        req.user = usuario;
        next();
    } catch {
        res.status(401).json({
            message: 'Sesion no valida o caducada',
        });
    }
};

const authorizeRoles = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
            message: 'No tienes permisos para esta accion',
        });
    }

    next();
};

module.exports = {
    authenticate,
    authorizeRoles,
};
