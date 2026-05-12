const { EntitySchema } = require('typeorm');

const Usuario = new EntitySchema({
    name: 'Usuario',
    tableName: 'usuarios',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        nombre: {
            type: String,
            length: 120,
            nullable: true,
        },
        email: {
            type: String,
            length: 160,
            unique: true,
        },
        passwordHash: {
            type: String,
            length: 255,
        },
        role: {
            type: String,
            length: 20,
            default: 'web',
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

module.exports = Usuario;
