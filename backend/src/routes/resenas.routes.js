const express = require('express');
const { obtenerResenasGoogle } = require('../controllers/resenas.controller');

const router = express.Router();

router.get('/google', obtenerResenasGoogle);

module.exports = router;
