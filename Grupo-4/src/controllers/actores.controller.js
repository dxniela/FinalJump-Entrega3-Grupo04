const db = require("../database/models");
const Actor = db.actores; 


// Recupera todos los actores
// GET /api/actores
exports.findAll= (req, res) => {
    const actor = req.query.actor;
    var condition = actor ? { actor: { [Op.like]: `%${actor}%` } } : null;

    Actor.findAll({
        attributes: ['id','nombre'],
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

// Obtener un  Actor con un id determinado
// GET /actores/:id)

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Actor.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: `Error al recuperar el Actor con el id = ${id}`
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