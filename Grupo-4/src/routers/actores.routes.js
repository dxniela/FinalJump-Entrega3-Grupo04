module.exports = app => {
    const actorController = require("../controllers/actores.controller.js");

    const router = require("express").Router();

    router.get("/", actorController.findAll);

    router.get("/:id", actorController.findOne);

    router.post("/", actorController.create);

    router.delete("/:id", actorController.destroy);

    router.put("/:id", actorController.update);

    app.use("/api/actores", router);
};