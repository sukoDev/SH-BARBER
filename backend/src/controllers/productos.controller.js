const AppDataSource = require('../db/data-source');
const Producto = require('../db/entities/Producto');

const obtenerProductos = async (req, res) => {
    try {
        const productoRepository = AppDataSource.getRepository(Producto);
        const productos = await productoRepository.find({
            where: { activo: true }, order: { nombre: 'ASC' }
        });
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos');
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

module.exports = { obtenerProductos };
