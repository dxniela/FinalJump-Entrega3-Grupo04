const express = require("express");
const bodyParser = require("body-parser");
const config = require("./src/config/config");

const app = express();

const corsOptions = {
    origin: "http://localhost:" + config.PORT
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Hi there, welcome to this tutorial." });
});

// Routers
require("./src/routers/content.routes")(app);
require("./src/routers/category.routes")(app);
require("./src/routers/genero.routes")(app);
require("./src/routers/actores.routes")(app);
require("./src/routers/tags.routes")(app);

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});