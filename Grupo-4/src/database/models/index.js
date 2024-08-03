const { Sequelize, DataTypes, Op } = require("sequelize");
const { database } = require('../../config/config.js');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
    database.DB_NAME,
    database.DB_USER,
    database.DB_PASS,
    {
        host: database.DB_HOST,
        port: database.DB_PORT,
        dialect: database.dialect
    }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

// Inicializar la tabla contenido
db.contenidos = require("./content.model.js")(sequelize, Sequelize, DataTypes);
db.categorias = require("./categoria.model.js")(sequelize, Sequelize, DataTypes); ////
db.tags = require('./tag.model.js')(sequelize, Sequelize, Sequelize.DataTypes);
db.actores = require('./actor.model.js')(sequelize, Sequelize, Sequelize.DataTypes);
db.generos = require('./genero.model.js')(sequelize, Sequelize, Sequelize.DataTypes);


async function getCategoriaId(nombre) {
    try {
        console.log(`Buscando ID para la categoría: ${nombre}`);
        if (typeof nombre !== 'string') {
            console.error(`Tipo de dato incorrecto para el nombre: ${typeof nombre}`);
            return null;
        }

        const categoria = await db.categorias.findOne({
            where: {
                nombre: {
                    [db.Sequelize.Op.eq]: nombre
                }
            }
        });

        if (categoria) {
            return categoria.id;
        } else {
            console.warn(`Categoría no encontrada: ${nombre}`);
            return null;
        }
    } catch (err) {
        console.error("Error al obtener ID de categoría:", err);
        return null;
    }
}

////

const Contenido = db.contenidos;

async function initial() {
    try {
        const count = await Contenido.count();
        if (count === 0) {
            const filePath = path.join(__dirname, '../../data/initialData.json');
            const initialData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            for (const item of initialData) {
                item.temporadas = item.temporadas === 'N/A' ? null : parseInt(item.temporadas);
                item.categoria = await getCategoriaId(item.categoria);

                try {
                    const [contenido, created] = await Contenido.findOrCreate({
                        where: { titulo: item.titulo },
                        defaults: item
                    });

                    if (created) {
                        console.log('Contenido creado:', contenido);

                        if (item.tags) {
                            for (const tagName of item.tags.split(', ')) {
                                let [tag] = await db.tags.findOrCreate({
                                    where: { nombre: tagName },
                                    attributes: ['id', 'nombre']
                                });
                                await contenido.addTag(tag);
                            }
                        }
                        if (item.genero) {
                            for (const generoName of item.genero.split(', ')) {
                                let [genero] = await db.generos.findOrCreate({
                                    where: { nombre: generoName },
                                    attributes: ['id', 'nombre']
                                });
                                await contenido.addGenero(genero);
                            }
                        }
                        if (item.reparto) {
                            for (const actorName of item.reparto.split(', ')) {
                                let [actor] = await db.actores.findOrCreate({
                                    where: { nombre: actorName },
                                    attributes: ['id', 'nombre']
                                });
                                await contenido.addActor(actor);
                            }
                        }
                    }
                } catch (err) {
                    console.error("Error al crear contenido:", err);
                }
            }

            console.log("Base de datos sincronizada y datos iniciales insertados.");
        } else {
            console.log("Los datos ya existen, omitiendo la inserción de datos iniciales.");
        }
    } catch (err) {
        console.error("Error al contar contenidos:", err);
    }
}

// Recorre todos los modelos en la base de datos
Object.keys(db).forEach(modelName => {
    // Verifica si el modelo tiene una función para definir asociaciones
    if (db[modelName].associate) {
        // Si tiene la función, la ejecuta para establecer las relaciones entre modelos
        db[modelName].associate(db);
    }
});

// Sincronizar la base de datos y llamar a la función inicial
sequelize.sync().then(() => {
    initial();
}).catch(err => {
    console.error("Error al sincronizar la base de datos:", err);
});

module.exports = db;