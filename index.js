const express = require("express");
const app = express();
const route = require("./routes/index-router");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use("/tasks", route);

app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server`);
    error.status = "Failed";
    error.statusCode = 404;
    next(error);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});