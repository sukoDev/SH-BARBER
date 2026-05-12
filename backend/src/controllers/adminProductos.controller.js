const AppDataSource = require('../db/data-source');
const Producto = require('../db/entities/Producto');

const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagenUrl } = req.body;

        if (!nombre || precio === undefined || precio === null || precio === '') {
            return res.status(400).json({
                message: 'Nombre y precio son obligatorios'
            });
        }

        const precioNumerico = Number(precio);

        if (Number.isNaN(precioNumerico) || precioNumerico < 0) {
            return res.status(400).json({
                message: 'El precio debe ser un numero valido'
            });
        }

        const productoRepository = AppDataSource.getRepository(Producto);

        const producto = productoRepository.create({
            nombre: nombre.trim(),
            descripcion: descripcion?.trim() || null,
            precio: precioNumerico,
            imagenUrl: imagenUrl?.trim() || null,
            activo: true
        });

        const productoGuardado = await productoRepository.save(producto);

        res.status(201).json(productoGuardado);
    } catch (error) {
        console.error('Error al crear el producto', error);
        res.status(500).json({
            message: 'Error al crear el producto'
        });
    }
};

module.exports = { crearProducto };
