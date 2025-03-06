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
