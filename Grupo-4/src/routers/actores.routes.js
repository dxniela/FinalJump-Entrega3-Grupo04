module.exports = app => {
    const actorController = require("../controllers/actores.controller.js");

    const router = require("express").Router();

    // Ruta para obtener todos los actores
    router.get("/", actorController.findAll);

    // Ruta para obtener un actor por su id
    router.get("/:id", actorController.findOne);

    // Ruta para crear un actor
    router.post("/", actorController.create);

    // Ruta para eliminar un actor por su id
    router.delete("/:id", actorController.destroy);

    // Ruta para actualizar un actor por su id
    router.put("/:id", actorController.update);

    app.use("/api/actores", router);
};