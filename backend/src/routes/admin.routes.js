const express = require('express');
const requireAdmin = require('../middlewares/admin.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const { crearProducto } = require('../controllers/adminProductos.controller');


const router = express.Router();

router.use(authenticate, requireAdmin);
router.post('/productos', crearProducto);

module.exports = router;
