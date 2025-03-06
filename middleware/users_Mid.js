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

async function getUsers(req, res, next) {
    const query = 'SELECT * FROM users';
    try {
        const [rows] = await db_pool.promise().query(query);
        req.users = rows;
        next();
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}

module.exports = {
    addUser,
    getUsers
};
