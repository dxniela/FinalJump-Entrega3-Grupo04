const db = require("../database/models");
const { mapContenido } = require('../utils/contentUtils');
const Contenido = db.contenidos;
const Categoria = db.categorias;
const Tag = db.tags;
const Actor = db.actores;
const Genero = db.generos;// Importa el modelo de Categoría
const Op = db.Op;

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
