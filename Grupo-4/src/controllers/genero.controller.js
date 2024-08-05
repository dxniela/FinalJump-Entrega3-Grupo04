const db = require("../database/models");
const { mapContenido } = require('../utils/contentUtils');
const Genero = db.generos;
const Contenido = db.contenidos;
const Categoria = db.categorias;
const Op = db.Op;


// Recupera todos los generos
// GET /api/generos
exports.findAll = (req, res) => {
    const genero = req.query.genero;
    var condition = genero ? { genero: { [Op.like]: `%${genero}%` } } : null;

    Genero.findAll({
        attributes: ['id', 'nombre'],
        where: condition
    })
        .then(data => {

            const result = data.map(genero => ({
                id: genero.id,
                nombre: genero.nombre,
            }));
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los generos."
            });
        });
};

//Series por Genero
//GET /serie/:genero
exports.findGeneroBySeries = (req, res) => {
    const generoNombre = req.params.genero;

    Genero.findOne({
        where: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col('nombre')), generoNombre),
        include: [
            {
                model: Contenido,
                as: 'contenidos',
                where: { categoria: 1 },
                include: [
                    { model: Categoria, as: 'categoriaDetalle', attributes: ['nombre'] },
                    { model: db.tags, as: 'tags', attributes: ['nombre'], through: { attributes: [] } },
                    { model: db.actores, as: 'actores', attributes: ['nombre'], through: { attributes: [] } }
                ]
            }
        ]
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se encontraron series para el género ${generoNombre}.` });
                return;
            }

            const result = data.contenidos.map(contenido => mapContenido(contenido, data.nombre));

            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Ocurrió un error al recuperar las series para el género ${generoNombre}.`
            });
        });
};

//Peliculas por Genero
//GET /pelicula/:genero
exports.findGeneroByPeliculas = (req, res) => {
    const generoNombre = req.params.genero;

    Genero.findOne({
        where: db.sequelize.where(db.sequelize.fn('lower', db.sequelize.col('nombre')), generoNombre),
        include: [
            {
                model: Contenido,
                as: 'contenidos',
                where: { categoria: 2 },
                include: [
                    { model: Categoria, as: 'categoriaDetalle', attributes: ['nombre'] },
                    { model: db.tags, as: 'tags', attributes: ['nombre'], through: { attributes: [] } },
                    { model: db.actores, as: 'actores', attributes: ['nombre'], through: { attributes: [] } }
                ]
            }
        ]
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se encontraron peliculas para el género ${generoNombre}.` });
                return;
            }

            const result = data.contenidos.map(contenido => mapContenido(contenido, data.nombre));

            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Ocurrió un error al recuperar las series para el género ${generoNombre}.`
            });
        });
};

// Crear un nuevo genero
// POST /api/genero
exports.create = (req, res) => {
    // Validar la solicitud
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El contenido no puede estar vacío."
        });
        return;
    }

    // Crear una genero
    const genero = {
        nombre: req.body.nombre
    };

    // Guardar el genero en la base de datos
    Genero.create(genero)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear un nuevo Genero."
            });
        });
};

// Eliminar un genero
// DELETE /api/genero/:id
exports.destroy = (req, res) => {
    const id = req.params.id;

    Genero.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El genero fue eliminado con éxito."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el genero con id=${id}. Tal vez el genero no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el genero con id=" + id
            });
        });
}

// Actualizar un generos
// PUT /api/genero/:id
exports.update = (req, res) => {
    const id = req.params.id;

    Genero.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Se Actualizó el genero de manera exitosa."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el genero con id=${id}. Tal vez el genero no fue encontrada o la solicitud está vacía.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el genero con id=" + id
            });
        });
}