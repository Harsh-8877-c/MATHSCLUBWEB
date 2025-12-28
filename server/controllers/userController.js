const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const SECRET_KEY = process.env.JWT_SECRET || 'your_super_secret_key_change_this';

// Register new user
exports.register = async (req, res) => {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ error: 'write valid email id' });
    }

    try {
        // Check if user already exists
        const [existingCheck] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingCheck.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role || 'Student';
        const isApproved = userRole === 'Admin' ? 1 : 0;
        const username = email.split('@')[0];
        const now = new Date();

        await db.query(
            'INSERT INTO users (full_name, email, password_hash, role, is_approved, username, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [full_name, email, hashedPassword, userRole, isApproved, username, now, now]
        );

        res.status(201).json({
            message: 'User registered successfully. Please wait for approval if required.'
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed: ' + err.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Approval check for non-Admin roles
        if (user.role !== 'Admin' && !user.is_approved) {
            return res.status(403).json({ error: 'Account not approved. Please contact Admin.' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, full_name, email, role, is_approved, createdAt FROM users ORDER BY createdAt DESC'
        );
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Approve user (Admin only)
exports.approveUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const [result] = await db.query('UPDATE users SET is_approved = 1 WHERE id = ?', [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User approved successfully' });
    } catch (err) {
        console.error('Error approving user:', err);
        res.status(500).json({ error: 'Failed to approve user' });
    }
};

// Get analytics data (Admin only)
exports.getAnalytics = async (req, res) => {
    try {
        const [totalUsers] = await db.query('SELECT COUNT(*) as count FROM users');
        const [pendingUsers] = await db.query('SELECT COUNT(*) as count FROM users WHERE is_approved = 0');
        const [students] = await db.query('SELECT COUNT(*) as count FROM users WHERE role = "Student"');
        const [members] = await db.query('SELECT COUNT(*) as count FROM users WHERE role = "ClubMember"');

        // Monthly growth (Last 6 months)
        const [userGrowth] = await db.query(`
            SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, COUNT(*) as count 
            FROM users 
            GROUP BY month 
            ORDER BY month ASC
        `);

        // Student growth
        const [studentGrowth] = await db.query(`
            SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, COUNT(*) as count 
            FROM users 
            WHERE role = 'Student'
            GROUP BY month 
            ORDER BY month ASC
        `);

        res.json({
            totalUsers: totalUsers[0].count,
            pendingUsers: pendingUsers[0].count,
            students: students[0].count,
            members: members[0].count,
            userGrowth,
            studentGrowth
        });
    } catch (err) {
        console.error('Error fetching analytics:', err);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};
