// 'use strict';
// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         await queryInterface.createTable('contenido_actor', {
//             contenidoId: {
//                 type: Sequelize.INTEGER,
//                 references: {
//                     model: 'contenido',
//                     key: 'id'
//                 },
//                 onUpdate: 'CASCADE',
//                 onDelete: 'CASCADE'
//             },
//             actorId: {
//                 type: Sequelize.INTEGER,
//                 references: {
//                     model: 'actores',
//                     key: 'id'
//                 },
//                 onUpdate: 'CASCADE',
//                 onDelete: 'CASCADE'
//             }
//         });
//     },
//     down: async (queryInterface, Sequelize) => {
//         await queryInterface.dropTable('contenido_actor');
//     }
// };
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('contenido_actor', {
            contenidoId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'contenido', // Asegúrate de que el nombre del modelo sea correcto
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            actorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'actores', // Asegúrate de que el nombre del modelo sea correcto
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('contenido_actor');
    }
};
