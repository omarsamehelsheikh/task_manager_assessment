const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug Route (To test if server is alive)
app.get('/', (req, res) => {
    res.send('Server is running and healthy!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Use Port 3000 instead of 5000 (Common conflict on Windows)
const PORT = 3000; 

const server = app.listen(PORT, () => {
    console.log(`✅ SERVER RUNNING on http://localhost:${PORT}`);
    console.log(`💽 Connected to SQLite database.`);
});

// Prevent server from crashing on errors
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});