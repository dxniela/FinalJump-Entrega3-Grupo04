module.exports = app => {
    const contentController = require("../controllers/content.controller.js");

    const router = require("express").Router();

    // Ruta para obtener toda la info de todas las pelis y series
    router.get("/", contentController.findAll);

    // Ruta para obtener toda la info de una peli o serie en particular
    router.get("/id/:id", contentController.findOne);

    // Ruta para buscar pelis o series por titulo
    router.get("/buscar", contentController.findByTitle);

    // Ruta para obtener todas las pelis
    router.get("/peliculas", contentController.findAllMovies);

    // Ruta para obtener todas las series
    router.get("/series", contentController.findAllSeries);

    // Ruta para crear una nueva peli o serie
    router.post("/", contentController.create);

    // Ruta para actualizar la info de una peli o serie
    router.put("/:id", contentController.update);

    // Ruta para eliminar una peli o serie
    router.delete("/:id", contentController.destroy);

    app.use("/api/contenido", router);
};