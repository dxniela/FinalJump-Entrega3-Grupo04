const db = require("../database/models");
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
            // Transformar los datos si es necesario
            const result = data.map(contenido => ({
                id: contenido.id,
                titulo: contenido.titulo,
                poster: contenido.poster,
                categoria: contenido.categoriaDetalle.nombre,
                tags: contenido.tags.map(t => t.nombre).join(', '),
                resumen: contenido.resumen,
                temporadas: contenido.temporadas,
                reparto: contenido.actores.map(a => a.nombre).join(', '),
                generos: contenido.generos.map(g => g.nombre).join(', '),
                trailer: contenido.trailer,
            }));

            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el catálogo."
            });
        });
};
