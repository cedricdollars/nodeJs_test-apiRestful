const express = require("express");
const app = express();
const route = require("./routes/index-router");
const bodyParser = require("body-parser");
const {
    handleError
} = require('./helpers/error');

const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use("/tasks", route);


app.use((error, req, res, next) => {
    handleError(error, res);
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;