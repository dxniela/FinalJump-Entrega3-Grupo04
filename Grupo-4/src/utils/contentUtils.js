// utils/contentUtils.js
const mapContenido = (contenido, generoNombre) => ({
    id: contenido.id,
    titulo: contenido.titulo,
    poster: contenido.poster,
    categoria: contenido.categoriaDetalle.nombre,
    tags: contenido.tags.map(t => t.nombre).join(', '),
    resumen: contenido.resumen,
    temporadas: contenido.temporadas,
    reparto: contenido.actores.map(a => a.nombre).join(', '),
    generos: generoNombre,
    trailer: contenido.trailer,
});

module.exports = { mapContenido };
