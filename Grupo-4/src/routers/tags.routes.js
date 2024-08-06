module.exports = app => {
    const tagController = require("../controllers/tags.controller.js");

    const router = require("express").Router();

    router.get("/", tagController.findAll);

    router.post("/", tagController.create);

    router.delete("/:id", tagController.destroy);

    router.put("/:id", tagController.update);

    app.use("/api/tags", router);
};