const db = require("../database/models");
const { mapContenido } = require('../utils/contentUtils');
const Contenido = db.contenidos;
const Categoria = db.categorias;
const Tag = db.tags;
const Actor = db.actores;
const Genero = db.generos;
const Op = db.Op;

// Obtener la información de todas las películas y series
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

    Contenido.findAll({
        where: condition,
        include: [
            { model: Categoria, as: 'categoriaDetalle', attributes: ['nombre'] },
            { model: Tag, as: 'tags', attributes: ['nombre'], through: { attributes: [] } },
            { model: Actor, as: 'actores', attributes: ['nombre'], through: { attributes: [] } },
            { model: Genero, as: 'generos', attributes: ['nombre'], through: { attributes: [] } }
        ]
    })
        .then(data => {

            const result = data.map(contenido => mapContenido(contenido, data.nombre));

            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el catálogo."
            });
        });
};

// Obtener la información de una película o serie por su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contenido.findByPk(id, {
        include: [
            { model: Categoria, as: 'categoriaDetalle', attributes: ['nombre'] },
            { model: Tag, as: 'tags', attributes: ['nombre'], through: { attributes: [] } },
            { model: Actor, as: 'actores', attributes: ['nombre'], through: { attributes: [] } },
            { model: Genero, as: 'generos', attributes: ['nombre'], through: { attributes: [] } }
        ]
    })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `No se encontró la película o serie con id ${id}`
                });
            }

            const result = mapContenido(data, data.nombre);
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar la película o serie con id ${id}`
            });
        });
};

// Filtrar por el título de una película o serie
exports.findByTitle = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

    Contenido.findAll({
        where: condition,
        include: [
            { model: Categoria, as: 'categoriaDetalle', attributes: ['nombre'] },
            { model: Tag, as: 'tags', attributes: ['nombre'], through: { attributes: [] } },
            { model: Actor, as: 'actores', attributes: ['nombre'], through: { attributes: [] } },
            { model: Genero, as: 'generos', attributes: ['nombre'], through: { attributes: [] } }
        ]
    })
        .then(data => {
            if(data.length === 0) {
                return res.status(404).send({
                    message: `No se encontró la película o serie con título ${titulo}`
                });
            }
            const result = data.map(contenido => mapContenido(contenido, data.nombre));
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar la película o serie con título ${titulo}`
            });
        });
};

// Obtener la información de todas las películas
exports.findAllMovies = (req, res) => {
    var condition = { categoria: 2 }; // 2 es el id de la categoría 'Película'

    Contenido.findAll({
        where: condition,
        include: [
            { model: Categoria, as: 'categoriaDetalle', attributes: ['nombre'] },
            { model: Tag, as: 'tags', attributes: ['nombre'], through: { attributes: [] } },
            { model: Actor, as: 'actores', attributes: ['nombre'], through: { attributes: [] } },
            { model: Genero, as: 'generos', attributes: ['nombre'], through: { attributes: [] } }
        ]
    })
        .then(data => {
            const result = data.map(contenido => mapContenido(contenido, data.nombre));
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las películas."
            });
        });
};

// Obtener la información de todas las series
exports.findAllSeries = (req, res) => {
    var condition = { categoria: 1 }; // 1 es el id de la categoría 'Serie'

    Contenido.findAll({
        where: condition,
        include: [
            { model: Categoria, as: 'categoriaDetalle', attributes: ['nombre'] },
            { model: Tag, as: 'tags', attributes: ['nombre'], through: { attributes: [] } },
            { model: Actor, as: 'actores', attributes: ['nombre'], through: { attributes: [] } },
            { model: Genero, as: 'generos', attributes: ['nombre'], through: { attributes: [] } }
        ]
    })
        .then(data => {
            const result = data.map(contenido => mapContenido(contenido, data.nombre));
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las series."
            });
        });
};

// Agregar una nueva película o serie
exports.create = async (req, res) => {
    if (!req.body.titulo) {
        res.status(400).send({
            message: "El contenido no puede estar vacío."
        });
        return;
    }

    const { titulo, poster, resumen, temporadas, trailer, categoria, tags, genero, reparto } = req.body;

    try {
        const nuevoContenido = await Contenido.create({
            titulo,
            poster,
            resumen,
            temporadas,
            trailer,
            categoria
        });

        // Asociar los géneros si están presentes
        if (genero) {
            const generoArray = genero.split(',').map(g => g.trim());
            const generos = await Genero.findAll({ where: { nombre: generoArray } });
            await nuevoContenido.addGeneros(generos);
        }

        // Asociar los tags si están presentes
        if (tags) {
            const tagsArray = tags.split(',').map(t => t.trim());
            const tagsInstances = await Promise.all(tagsArray.map(async (tag) => {
                const [tagInstance] = await Tag.findOrCreate({ where: { nombre: tag } });
                return tagInstance;
            }));
            await nuevoContenido.addTags(tagsInstances);
        }

        // Asociar los actores si están presentes
        if (reparto) {
            const actoresArray = reparto.split(',').map(a => a.trim());
            const actoresInstances = await Promise.all(actoresArray.map(async (actor) => {
                const [actorInstance] = await Actor.findOrCreate({ where: { nombre: actor } });
                return actorInstance;
            }));
            await nuevoContenido.addActores(actoresInstances);
        }

        res.status(201).send(nuevoContenido);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear el contenido."
        });
    }
};

// Actualizar la información de una película o serie por su id
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const contenido = await Contenido.findByPk(id);

        if (!contenido) {
            return res.status(404).send({
                message: `No se encontró la película o serie con id ${id}`
            });
        }

        const { titulo, poster, resumen, temporadas, trailer, categoria, tags, genero, reparto } = req.body;

        await Contenido.update({
            titulo,
            poster,
            resumen,
            temporadas,
            trailer,
            categoria
        }, { where: { id } });

        // Asociar los géneros si están presentes
        if (genero) {
            const generoArray = genero.split(',').map(g => g.trim());
            const generos = await Genero.findAll({ where: { nombre: generoArray } });
            await contenido.setGeneros(generos);
        }

        // Asociar los tags si están presentes
        if (tags) {
            const tagsArray = tags.split(',').map(t => t.trim());
            const tagsInstances = await Promise.all(tagsArray.map(async (tag) => {
                const [tagInstance] = await Tag.findOrCreate({ where: { nombre: tag } });
                return tagInstance;
            }));
            await contenido.setTags(tagsInstances);
        }

        // Asociar los actores si están presentes
        if (reparto) {
            const actoresArray = reparto.split(',').map(a => a.trim());
            const actoresInstances = await Promise.all(actoresArray.map(async (actor) => {
                const [actorInstance] = await Actor.findOrCreate({ where: { nombre: actor } });
                return actorInstance;
            }));
            await contenido.setActores(actoresInstances);
        }

        res.send({ message: `La película o serie con id ${id} fue actualizada exitosamente.` });
    } catch (err) {
        res.status(500).send({
            message: `Error al actualizar la película o serie con id ${id}`
        });
    }
};

// Eliminar una película o serie por su id
exports.destroy = async (req, res) => {
    const id = req.params.id;
    console.log(`Intentando eliminar contenido con id: ${id}`);

   Contenido.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La película o serie fue eliminada con éxito."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la película o serie con id=${id}. Tal vez la película o serie no fue encontrada.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la película o serie con id=" + id
            });
   })
};