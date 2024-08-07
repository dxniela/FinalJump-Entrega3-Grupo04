const db = require("../database/models");
const Actor = db.actores;
const Contenido = db.contenidos;

// Recupera todos los actores
// GET /api/actores
exports.findAll = (req, res) => {
    const actor = req.query.actor;
    var condition = actor ? { actor: { [Op.like]: `%${actor}%` } } : null;

    Actor.findAll({
        attributes: ['id', 'nombre'],
        where: condition
    })
        .then(data => {

            const result = data.map(actor => ({
                id: actor.id,
                nombre: actor.nombre,
            }));
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los actores."
            });
        });
};

// Obtener un el primer actor con el nombre similar y las obras que trabajo
// GET api/actores/actores?actor=:nombre)
exports.findOne = (req, res) => {
    const nombre = req.query.actor;

    if (!nombre) {
        res.status(400).send({
            message: "El nombre del actor no puede estar vacío."
        });
        return;
    }

    Actor.findOne({
        where: { nombre: { [db.Sequelize.Op.like]: `%${nombre}%` } },
        include: [
            {
                model: Contenido,
                as: 'contenidos',
                attributes: ['id', 'titulo', 'poster', 'resumen', 'temporadas', 'trailer', 'categoria'],
                through: { attributes: [] }  // Excluir atributos de la tabla intermedia
            }
        ]
    })
        .then(actor => {
            if (!actor) {
                res.status(404).send({
                    message: `No se encontró el actor con el nombre ${nombre}`
                });
                return;
            }

            res.send(actor);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar el actor con el nombre ${nombre}`
            });
        });
};

// Crear un nuevo actor
// POST /api/actor
exports.create = (req, res) => {
    // Validar la solicitud
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El contenido no puede estar vacío."
        });
        return;
    }

    // Crear un actor
    const actor = {
        nombre: req.body.nombre
    };

    // Guardar el actor en la base de datos
    Actor.create(actor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear un nuevo actor."
            });
        });
};

// Eliminar un actor
// DELETE /api/actor/:id
exports.destroy = (req, res) => {
    const id = req.params.id;

    Actor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El actor fue eliminado con éxito."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el actor con id=${id}. Tal vez el actor no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el actor con id=" + id
            });
        });
}

// Actualizar un actor
// PUT /api/actor/:id
exports.update = (req, res) => {
    const id = req.params.id;

    Actor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Se Actualizó el Actor de manera exitosa."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Actor con id=${id}. Tal vez el actor no fue encontrado o la solicitud está vacía.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el actor con id=" + id
            });
        });
}