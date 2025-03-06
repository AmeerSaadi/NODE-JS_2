async function addMeasurement(req, res, next) {
    const { userId, systolic, diastolic, pulse, date } = req.body;


    if (!userId || !systolic || !diastolic || !pulse || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = 'INSERT INTO measurements (user_id, systolic, diastolic, pulse, date) VALUES (?, ?, ?, ?, ?)';
    try {
        await db_pool.promise().query(query, [userId, systolic, diastolic, pulse, date]);
        next();
    } catch (err) {
        console.error('Error adding measurement:', err);
        res.status(500).json({ message: 'Error adding measurement', error: err.message });
    }
}

async function getHistory(req, res, next) {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const query = 'SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC';
    try {
        const [rows] = await db_pool.promise().query(query, [userId]);
        req.history = rows;
        next();
    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).json({ message: 'Error fetching history', error: err.message });
    }
}

async function getStats(req, res, next) {
    const query = `
        SELECT user_id, 
               AVG(systolic) AS avg_systolic, 
               AVG(diastolic) AS avg_diastolic, 
               COUNT(CASE WHEN systolic > 1.2 * (SELECT AVG(systolic) FROM measurements) 
                           OR diastolic > 1.2 * (SELECT AVG(diastolic) FROM measurements) 
                           THEN 1 END) AS abnormal_count
        FROM measurements
        GROUP BY user_id;
    `;
    try {
        const [rows] = await db_pool.promise().query(query);
        req.stats = rows;
        next();
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ message: 'Error fetching stats', error: err.message });
    }
}
