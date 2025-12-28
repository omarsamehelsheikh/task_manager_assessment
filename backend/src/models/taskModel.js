const db = require('../config/db');

exports.create = (userId, title, description) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)`,
            [userId, title, description, 'pending'],
            function(err) {
                if (err) reject(err);
                resolve({ id: this.lastID, title, description, status: 'pending' });
            }
        );
    });
};

exports.findAllByUser = (userId, limit, offset) => {
    return new Promise((resolve, reject) => {
        // Query to get tasks with pagination
        db.all(`SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`, 
            [userId, limit, offset], 
            (err, rows) => {
                if (err) reject(err);
                
                // Query to count total tasks (for frontend pagination logic)
                db.get(`SELECT count(*) as count FROM tasks WHERE user_id = ?`, [userId], (err, countRow) => {
                    if (err) reject(err);
                    resolve({ tasks: rows, total: countRow.count });
                });
            }
        );
    });
};

exports.updateStatus = (id, userId, status) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?`,
            [status, id, userId],
            function(err) {
                if (err) reject(err);
                resolve(this.changes > 0);
            }
        );
    });
};

exports.delete = (id, userId) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM tasks WHERE id = ? AND user_id = ?`,
            [id, userId],
            function(err) {
                if (err) reject(err);
                resolve(this.changes > 0);
            }
        );
    });
};