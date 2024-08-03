module.exports = app => {
    const contentController = require("../controllers/content.controller.js");

    const router = require("express").Router();

    router.get("/", contentController.findAll);

    app.use("/api/content", router);
};