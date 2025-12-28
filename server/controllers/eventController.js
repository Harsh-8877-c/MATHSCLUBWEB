const db = require('../db');

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, time, location } = req.body;
        const createdBy = req.user.id; // From authMiddleware

        if (!title || !description || !date || !time || !location) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Insert new event
        const [result] = await db.execute(
            'INSERT INTO events (title, description, date, time, location, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [title, description, date, time, location, createdBy]
        );

        res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event', details: error.message });
    }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
    try {
        const [events] = await db.execute(`
            SELECT e.*, u.full_name as organizer 
            FROM events e 
            LEFT JOIN users u ON e.created_by = u.id 
            ORDER BY e.date ASC, e.time ASC
        `);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if event exists
        const [events] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);
        if (events.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Delete (Cascade should handle related media/feedback if configured, otherwise we might need manual cleanup)
        // Assuming ON DELETE CASCADE is set on foreign keys (checked create_media_table.js, it is)
        await db.execute('DELETE FROM events WHERE id = ?', [id]);

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};
