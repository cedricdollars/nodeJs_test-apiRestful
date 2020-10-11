const express = require("express");
const tasks = require("../services/todo");
const router = express.Router();


router.get("/all", (req, res, next) => {
    return res.send(tasks);
});

router.get("/:id", (req, res, next) => {
    const taskId = req.params.id;
    const task = tasks.find((task) => parseInt(taskId) === task.id);
    if (!task) {
        return next(new Error(`Not task with ${taskId} found`));
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
            return res.status(400).send({
                error: true,
                message: "name or done is empty or invalid",
            });
        }
        console.log(newTask);
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        error.message = "Unabled to add new task";
        next(error);
    }
});

module.exports = router;