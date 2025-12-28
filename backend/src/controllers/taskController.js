const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5; // Tasks per page
        const offset = (page - 1) * limit;

        const data = await Task.findAllByUser(req.user.id, limit, offset);
        
        res.json({
            tasks: data.tasks,
            currentPage: page,
            totalPages: Math.ceil(data.total / limit),
            totalTasks: data.total
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const task = await Task.create(req.user.id, title, description);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { status } = req.body;
        const success = await Task.updateStatus(req.params.id, req.user.id, status);
        if (!success) return res.status(404).json({ error: 'Task not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const success = await Task.delete(req.params.id, req.user.id);
        if (!success) return res.status(404).json({ error: 'Task not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};