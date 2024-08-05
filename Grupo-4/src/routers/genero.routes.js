module.exports = app => {
    const generoController = require("../controllers/genero.controller.js");

    const router = require("express").Router();

    router.get("/", generoController.findAll); // obtemer todas los generos

    router.get("/serie/:genero", generoController.findGeneroBySeries); // obtener todas las series según el género

    router.get("/pelicula/:genero", generoController.findGeneroByPeliculas); //obtener todas las peliculas por genero

    router.post("/", generoController.create);

    router.delete("/:id", generoController.destroy);

    router.put("/:id", generoController.update);

    app.use("/api/genero", router);
};