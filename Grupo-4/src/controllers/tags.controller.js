const db = require("../database/models");
const Tag = db.tags; 


// Recupera todos los tags
// GET /api/tags
exports.findAll= (req, res) => {
    const tag = req.query.tag;
    var condition = tag ? { tag: { [Op.like]: `%${tag}%` } } : null;

    Tag.findAll({
        attributes: ['id','nombre'],
        where: condition
    })
    .then(data => {

        const result = data.map(tag => ({
            id: tag.id,
            nombre: tag.nombre,
        }));
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al recuperar los tags."
        });
    });
};

// Crear una nueva tag
// POST /api/tag
exports.create = (req, res) => {
    // Validar la solicitud
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El contenido no puede estar vacío."
        });
        return;
    }

    // Crear un tag
    const tag = {
        nombre: req.body.nombre
    };

    // Guardar el tag en la base de datos
    Tag.create(actor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear un nuevo tag."
            });
        });
};

// Eliminar un tag
// DELETE /api/tag/:id
exports.destroy = (req, res) => {
    const id = req.params.id;

    Tag.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El tag fue eliminado con éxito."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el tag con id=${id}. Tal vez el tag  no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el tag  con id=" + id
            });
        });
}

// Actualizar un tag
// PUT /api/tag/:id

exports.update = (req, res) => {
    const id = req.params.id;

    Tag.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Se Actualizó el tag de manera exitosa."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el tag con id=${id}. Tal vez el tag no fue encontrado o la solicitud está vacía.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el tag con id=" + id
            });
        });
}