const taskRepository = require('../repositories/taskRepository');

class TaskService {
    async createTask(userId, title, description) {
        // Business Logic: Title validation
        if (!title) {
            throw new Error("Validation Error: Title is required");
        }
        return await taskRepository.create(userId, title, description);
    }

    async getTasks(userId, page) {
        // Business Logic: Pagination Math
        const limit = 5;
        const currentPage = parseInt(page) || 1;
        const offset = (currentPage - 1) * limit;

        const data = await taskRepository.findAllByUser(userId, limit, offset);

        return {
            tasks: data.tasks,
            currentPage: currentPage,
            totalPages: Math.ceil(data.total / limit),
            totalTasks: data.total
        };
    }

    async updateTaskStatus(taskId, userId, status) {
        // Business Logic: Validate allowed statuses
        const allowedStatuses = ['pending', 'in_progress', 'done'];
        if (!allowedStatuses.includes(status)) {
            throw new Error("Invalid status update");
        }

        const success = await taskRepository.updateStatus(taskId, userId, status);
        if (!success) {
            throw new Error("Task not found or unauthorized");
        }
        return { message: "Task updated successfully" };
    }

    async deleteTask(taskId, userId) {
        const success = await taskRepository.delete(taskId, userId);
        if (!success) {
            throw new Error("Task not found or unauthorized");
        }
        return { message: "Task deleted successfully" };
    }
}

module.exports = new TaskService();