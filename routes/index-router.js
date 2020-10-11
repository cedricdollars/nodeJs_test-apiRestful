const express = require("express");
const tasks = require("../services/todo");
const {
    ErrorHandler
} = require('../helpers/error')
const router = express.Router();


router.get("/all", (req, res, next) => {
    return res.send(tasks);
});

router.get("/:id", (req, res, next) => {
    const taskId = req.params.id;
    const task = tasks.find((task) => parseInt(taskId) === task.id);
    if (!task) {
        throw new ErrorHandler(404, `Cannot find task with id ${taskId}`);
    }
    res.send(task);

});

router.post("/add", async(req, res, next) => {
    try {
        const body = req.body;
        const newTask = {
            id: tasks.length + 1,
            name: body.name,
            done: body.done,
        };

        if (JSON.stringify(req.body) === "{}") {
            throw new ErrorHandler(400, 'No empty fields is allowed')
        }
        console.log(newTask);
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

module.exports = router;