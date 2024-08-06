module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");

    const router = require("express").Router();

    // Ruta para obtener todas las categorias
    router.get("/", categoryController.findAll);

    // Ruta para crear una categoría
    router.post("/", categoryController.create);

    // Ruta para eliminar una categoría
    router.delete("/:id", categoryController.destroy);

    // Ruta para actualizar una categoría
    router.put("/:id", categoryController.update);

    app.use("/api/categoria", router);
};