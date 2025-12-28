require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import controllers
const userController = require('./controllers/userController');

// Auth routes
app.post('/api/auth/register', userController.register);
app.post('/api/auth/login', userController.login);

// User management routes
app.get('/api/users', userController.getAllUsers);
app.delete('/api/users/:id', userController.deleteUser);
app.put('/api/users/:id/approve', userController.approveUser);
app.get('/api/analytics', userController.getAnalytics);

// Test database connection
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({
            message: 'Database connected successfully',
            result: rows[0].result
        });
    } catch (err) {
        console.error('Database test failed:', err);
        res.status(500).json({
            error: 'Database connection failed',
            details: err.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route for friendly message
app.get('/', (req, res) => {
    res.send(`
        <h1>Backend is Running ✅</h1>
        <p>This is the API server. Please access the website at: <a href="http://localhost:8080">http://localhost:8080</a></p>
    `);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database test: http://localhost:${PORT}/api/test-db`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    process.exit(0);
});
