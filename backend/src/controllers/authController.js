const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Basic Input Validation
        if (!email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Delegate to Service
        const user = await authService.registerUser(name, email, password);
        
        // Send Success Response
        res.status(201).json(user);
    } catch (err) {
        // Handle Errors (e.g., "Email already in use")
        const status = err.message === "Email already in use" ? 400 : 500;
        res.status(status).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Delegate to Service
        const result = await authService.loginUser(email, password);

        // Send Success Response with Token
        res.json(result);
    } catch (err) {
        // Handle Errors (e.g., "Invalid credentials")
        const status = err.message === "Invalid credentials" ? 401 : 500;
        res.status(status).json({ error: err.message });
    }
};