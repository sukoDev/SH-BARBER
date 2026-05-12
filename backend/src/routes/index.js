const express = require('express');
const productosRoutes = require('./productos.routes');
const adminRoutes = require('./admin.routes');
const authRoutes = require('./auth.routes');
const resenasRoutes = require('./resenas.routes');

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'sh-barber-api'
    });
});

router.use('/productos', productosRoutes);
router.use('/resenas', resenasRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
