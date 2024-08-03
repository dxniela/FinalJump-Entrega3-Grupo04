'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('contenido_tag', {
            contenidoId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'contenido',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            tagId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'tags',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('contenido_tag');
    }
};
