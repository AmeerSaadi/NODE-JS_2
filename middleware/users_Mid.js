async function addUser(req, res, next) {
    const { name } = req.body;
    const query = 'INSERT INTO users (name) VALUES (?)';
    try {
        const [result] = await db_pool.promise().query(query, [name]);
        req.userId = result.insertId;
        next();
    } catch (err) {
        res.status(500).json({ message: 'Error adding user' });
    }
}
