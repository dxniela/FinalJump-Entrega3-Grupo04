module.exports = (sequelize, Sequelize, DataTypes) => {
    const Tag = sequelize.define("tags", {
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
        tableName: 'tags',
        underscored: true,
        timestamps: true
    });

    Tag.associate = models => {
        Tag.belongsToMany(models.contenidos, {
            through: 'contenido_tag',
            foreignKey: 'tagId',
            as: 'contenidos'
        });
    };
    return Tag;
};
