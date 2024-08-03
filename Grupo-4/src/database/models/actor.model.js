// module.exports = (sequelize, Sequelize, DataTypes) => {
//     const Actor = sequelize.define("actores", {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         nombre: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     }, {
//         tableName: 'actores',
//         underscored: true,
//         timestamps: true
//     });

//     Actor.associate = models => {
//         Actor.belongsToMany(models.contenidos, {
//             through: 'contenido_actor',
//             foreignKey: 'actorId',
//             as: 'contenidos'
//         });
//     };

//     return Actor;
// };
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Actor = sequelize.define("actores", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'actores',
        underscored: true,
        timestamps: true
    });

    Actor.associate = models => {
        Actor.belongsToMany(models.contenidos, {
            through: 'contenido_actor',
            foreignKey: 'actorId',
            as: 'contenidos'
        });
    };

    return Actor;
};
