// src/database/models/categoria.model.js
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Categoria = sequelize.define("categorias", {
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
        tableName: 'categorias',
        timestamps: false
    });

    Categoria.associate = models => {
        Categoria.hasMany(models.contenidos, {
            foreignKey: 'categoria',
            as: 'contenidos'
        });
    };

    return Categoria;
};
