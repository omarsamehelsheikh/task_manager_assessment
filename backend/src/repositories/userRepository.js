const db = require('../config/db');

class UserRepository {
    // Create a new user in the DB
    create(name, email, password) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
            db.run(sql, [name, email, password], function(err) {
                if (err) reject(err);
                // Return the new user's ID and info (but NOT the password)
                resolve({ id: this.lastID, name, email });
            });
        });
    }

    // Find a user by email
    findByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE email = ?`;
            db.get(sql, [email], (err, row) => {
                if (err) reject(err);
                resolve(row); // Returns undefined if no user found
            });
        });
    }
}

module.exports = new UserRepository();