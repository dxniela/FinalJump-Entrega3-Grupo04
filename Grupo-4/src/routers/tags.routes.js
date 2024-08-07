module.exports = app => {
    const tagController = require("../controllers/tags.controller.js");

    const router = require("express").Router();

    // Ruta para obtener todos los tags
    router.get("/", tagController.findAll);

    // Ruta para crear un tag
    router.post("/", tagController.create);

    // Ruta para eliminar un tag por id
    router.delete("/:id", tagController.destroy);

    // Ruta para actualizar un tag por id
    router.put("/:id", tagController.update);

    app.use("/api/tags", router);
};