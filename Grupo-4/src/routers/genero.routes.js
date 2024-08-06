module.exports = app => {
    const generoController = require("../controllers/genero.controller.js");

    const router = require("express").Router();

    // Ruta para obtener todas los generos
    router.get("/", generoController.findAll); 

    // Ruta para obtener todas las series de un genero en especifico
    router.get("/serie/:genero", generoController.findGeneroBySeries); 

    // Ruta para obtener todas las peliculas de un genero en especifico
    router.get("/pelicula/:genero", generoController.findGeneroByPeliculas); 

    // Ruta para crear un genero
    router.post("/", generoController.create); 

    // Ruta para eliminar un genero
    router.delete("/:id", generoController.destroy); 

    // Ruta para actualizar un genero
    router.put("/:id", generoController.update);

    app.use("/api/genero", router);
};