module.exports = (sequelize, Sequelize, DataTypes) => {
    const Contenido = sequelize.define(
        "contenido",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            poster: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            resumen: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            temporadas: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            trailer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categoria: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'categorias',
                    key: 'id',
                },
            },
        },
        {
            tableName: 'contenido',
            timestamps: false,
            underscored: true,
        }
    );

    Contenido.associate = function (models) {
        // Asociación muchos a uno con Categorías
        Contenido.belongsTo(models.categorias, {
            foreignKey: 'categoria',
            as: 'categoriaDetalle'
        });

        // Asociación muchos a muchos con Tags
        Contenido.belongsToMany(models.tags, {
            through: 'contenido_tag',
            foreignKey: 'contenidoId',
            otherKey: 'tagId',
            as: 'tags'
        });
        // Asociación muchos a muchos con Actores
        Contenido.belongsToMany(models.actores, {
            through: 'contenido_actor',
            as: 'actores',
            foreignKey: 'contenidoId',
            otherKey: 'actorId'
        });
        // Asociación muchos a muchos con Generos
        Contenido.belongsToMany(models.generos, {
            through: 'contenido_genero',
            foreignKey: 'contenidoId',
            otherKey: 'generoId',
            as: 'generos'
        });
    };


    return Contenido;
};
