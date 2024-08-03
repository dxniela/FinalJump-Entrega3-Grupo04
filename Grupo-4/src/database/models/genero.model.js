module.exports = (sequelize, Sequelize, DataTypes) => {
    const Genero = sequelize.define("genero", {
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
        tableName: 'generos',
        underscored: true,
        timestamps: true
    });

    Genero.associate = models => {
        Genero.belongsToMany(models.contenidos, {
            through: 'contenido_genero',
            foreignKey: 'generoId',
            as: 'contenidos'
        });
    };

    return Genero;
};
