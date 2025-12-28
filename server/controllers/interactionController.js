const db = require('../db');

// Add Media
exports.addMedia = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { url, type, caption } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const [result] = await db.execute(
            'INSERT INTO event_media (event_id, url, type, caption) VALUES (?, ?, ?, ?)',
            [eventId, url, type || 'image', caption || null]
        );

        res.status(201).json({ message: 'Media added', mediaId: result.insertId });
    } catch (error) {
        console.error('Error adding media:', error);
        res.status(500).json({ error: 'Failed to add media' });
    }
};

// Add Feedback
exports.addFeedback = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating (1-5) is required' });
        }

        await db.execute(
            'INSERT INTO event_feedback (event_id, user_id, rating, comment) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?, comment = ?',
            [eventId, userId, rating, comment, rating, comment]
        );

        res.json({ message: 'Feedback submitted' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
};

// Mark Attendance (Admin/Coordinator Only) -- Verified by Middleware usually
exports.markAttendance = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId, status } = req.body; // status: 'present', 'absent'

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        await db.execute(
            'INSERT INTO event_attendance (event_id, user_id, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = ?, marked_at = CURRENT_TIMESTAMP',
            [eventId, userId, status || 'present', status || 'present']
        );

        res.json({ message: 'Attendance marked' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Failed to mark attendance' });
    }
};

// Get Event Details (Extended)
// This will replace or augment the GET /events/:id logic
exports.getEventDetails = async (req, res) => {
    try {
        const { eventId } = req.params;

        // 1. Basic Info
        const [rows] = await db.execute('SELECT * FROM events WHERE id = ?', [eventId]);
        if (rows.length === 0) return res.status(404).json({ error: 'Event not found' });
        const event = rows[0];

        // 2. Media
        const [media] = await db.execute('SELECT * FROM event_media WHERE event_id = ? ORDER BY created_at DESC', [eventId]);

        // 3. Feedback Stats
        const [feedbackStats] = await db.execute('SELECT AVG(rating) as avgRating, COUNT(*) as count FROM event_feedback WHERE event_id = ?', [eventId]);

        // 4. Feedback List (Recent 5 or all? Let's do recent 10)
        const [feedbackList] = await db.execute(`
            SELECT f.*, u.full_name, u.role 
            FROM event_feedback f 
            JOIN users u ON f.user_id = u.id 
            WHERE f.event_id = ? 
            ORDER BY f.created_at DESC LIMIT 10
        `, [eventId]);

        // 5. Attendance Count (If Admin/Coordinator request? For public just show "X attending")
        // For simple view:
        const [attendanceStats] = await db.execute('SELECT COUNT(*) as presentCount FROM event_attendance WHERE event_id = ? AND status = "present"', [eventId]);

        res.json({
            ...event,
            media,
            rating: feedbackStats[0].avgRating || 0,
            reviewCount: feedbackStats[0].count,
            attendees: attendanceStats[0].presentCount,
            recentFeedback: feedbackList
        });

    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Failed to fetch event details' });
    }
};

// Get Full Attendance List (Admin Only)
exports.getAttendanceList = async (req, res) => {
    try {
        const { eventId } = req.params;
        const [list] = await db.execute(`
            SELECT a.*, u.full_name, u.email, u.role
            FROM event_attendance a
            JOIN users u ON a.user_id = u.id
            WHERE a.event_id = ?
            ORDER BY u.full_name ASC
        `, [eventId]);

        res.json(list);
    } catch (error) {
        console.error('Error fetching attendance list:', error);
        res.status(500).json({ error: 'Failed to fetch attendance list' });
    }
};
