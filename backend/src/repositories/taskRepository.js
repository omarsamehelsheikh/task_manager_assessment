const db = require('../config/db');

class TaskRepository {
    create(userId, title, description) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)`;
            db.run(sql, [userId, title, description, 'pending'], function(err) {
                if (err) reject(err);
                resolve({ id: this.lastID, title, description, status: 'pending' });
            });
        });
    }

    findAllByUser(userId, limit, offset) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;
            db.all(sql, [userId, limit, offset], (err, rows) => {
                if (err) reject(err);
                
                // Get count for pagination
                db.get(`SELECT count(*) as count FROM tasks WHERE user_id = ?`, [userId], (err, countRow) => {
                    if (err) reject(err);
                    resolve({ tasks: rows, total: countRow.count });
                });
            });
        });
    }

    updateStatus(id, userId, status) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?`;
            db.run(sql, [status, id, userId], function(err) {
                if (err) reject(err);
                resolve(this.changes > 0); // Returns true if a row was updated
            });
        });
    }

    delete(id, userId) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
            db.run(sql, [id, userId], function(err) {
                if (err) reject(err);
                resolve(this.changes > 0);
            });
        });
    }
}

module.exports = new TaskRepository();