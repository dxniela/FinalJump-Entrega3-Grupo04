module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");

    const router = require("express").Router();

    router.get("/", categoryController.findAll);

    router.post("/", categoryController.create);

    router.delete("/:id", categoryController.destroy);

    router.put("/:id", categoryController.update);

    app.use("/api/categoria", router);
};