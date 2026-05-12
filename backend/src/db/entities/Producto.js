const { EntitySchema } = require('typeorm');

const Producto = new EntitySchema({
    name: 'Producto',
    tableName: 'productos',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        nombre: {
            type: String,
            length: 120,
        },
        descripcion: {
            type: 'text',
            nullable: true,
        },
        precio: {
            type: 'decimal',
            precision: 10,
            scale: 2,
        },
        imagenUrl: {
            type: String,
            length: 255,
            nullable: true,
        },
        activo: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
        },
        updatedAt: {
            type: 'timestamp',
            updateDate: true,
        },
    },
});

module.exports = Producto;
