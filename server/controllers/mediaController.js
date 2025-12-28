const db = require('../db');

// Add Media
exports.addMedia = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { type, caption } = req.body;
        let url = req.body.url;

        // Handle File Upload
        if (req.file) {
            // Construct URL assumes server runs on same host/port 
            // In production, this should be configurable
            url = `${req.protocol}://${req.get('host')}/uploads/events/${req.file.filename}`;
        }

        if (!url) {
            return res.status(400).json({ error: 'URL or File is required' });
        }

        const [result] = await db.execute(
            'INSERT INTO event_media (event_id, url, type, caption) VALUES (?, ?, ?, ?)',
            [eventId, url, type || 'image', caption || null]
        );

        res.status(201).json({ message: 'Media added', mediaId: result.insertId, url: url });
    } catch (error) {
        console.error('Error adding media:', error);
        res.status(500).json({ error: 'Failed to add media' });
    }
};

// Get Event Media
exports.getEventMedia = async (req, res) => {
    try {
        const { eventId } = req.params;
        const [media] = await db.execute('SELECT * FROM event_media WHERE event_id = ? ORDER BY created_at DESC', [eventId]);
        res.json(media);
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ error: 'Failed to fetch media' });
    }
};
