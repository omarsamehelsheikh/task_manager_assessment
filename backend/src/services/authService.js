const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Use environment variable for secret, fallback only for dev
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';

class AuthService {
    async registerUser(name, email, password) {
        // 1. Check if user already exists
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already in use");
        }

        // 2. Hash the password (Security Logic)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Save to DB via Repository
        return await userRepository.create(name, email, hashedPassword);
    }

    async loginUser(email, password) {
        // 1. Find user
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        // 2. Compare Passwords (Security Logic)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // 3. Generate Token (Business Logic)
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

        return { token, user: { id: user.id, name: user.name, email: user.email } };
    }
}

module.exports = new AuthService();