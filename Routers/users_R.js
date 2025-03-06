const express = require('express');
const path = require('path');
const router = express.Router();
const users_Mid = require('../Middleware/users_Mid');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
});

module.exports = router;
