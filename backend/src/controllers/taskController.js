const taskService = require('../services/taskService');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        // Controller delegates everything to the Service
        const task = await taskService.createTask(req.user.id, title, description);
        res.status(201).json(task);
    } catch (err) {
        // If it's a validation error, send 400. Otherwise 500.
        const status = err.message.includes("Validation") ? 400 : 500;
        res.status(status).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const data = await taskService.getTasks(req.user.id, req.query.page);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { status } = req.body;
        const result = await taskService.updateTaskStatus(req.params.id, req.user.id, status);
        res.json(result);
    } catch (err) {
        const status = err.message.includes("not found") ? 404 : 400;
        res.status(status).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const result = await taskService.deleteTask(req.params.id, req.user.id);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};