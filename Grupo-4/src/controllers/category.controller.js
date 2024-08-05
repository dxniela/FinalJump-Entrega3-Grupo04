const db = require("../database/models");
const Categoria = db.categorias;


// Recupera todas las categorías
// GET /api/categoria
exports.findAll= (req, res) => {
    const categoria = req.query.categoria;
    var condition = categoria ? { categoria: { [Op.like]: `%${categoria}%` } } : null;

    Categoria.findAll({
        attributes: ['id','nombre'],
        where: condition
    })
    .then(data => {

        const result = data.map(categoria => ({
            id: categoria.id,
            nombre: categoria.nombre,
        }));
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al recuperar las categorías."
        });
    });
};

// Crear una nueva categoría
// POST /api/categoria
exports.create = (req, res) => {
    // Validar la solicitud
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El contenido no puede estar vacío."
        });
        return;
    }

    // Crear una categoría
    const categoria = {
        nombre: req.body.nombre
    };

    // Guardar la categoría en la base de datos
    Categoria.create(categoria)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la categoría."
            });
        });
};

// Eliminar una categoría
// DELETE /api/categoria/:id
exports.destroy = (req, res) => {
    const id = req.params.id;

    Categoria.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La categoría fue eliminada con éxito."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la categoría con id=${id}. Tal vez la categoría no fue encontrada.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la categoría con id=" + id
            });
        });
}

// Actualizar una categoría
// PUT /api/categoria/:id

exports.update = (req, res) => {
    const id = req.params.id;

    Categoria.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Se Actualizó la categoria de manera exitosa."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la categoría con id=${id}. Tal vez la categoría no fue encontrada o la solicitud está vacía.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la categoría con id=" + id
            });
        });
}