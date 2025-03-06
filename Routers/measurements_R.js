const express = require('express');
const path = require('path');
const router = express.Router();
const measurements_Mid = require('../Middleware/measurements_Mid');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'measurements.html'));
});


router.post('/', measurements_Mid.addMeasurement, (req, res) => {
    res.status(200).json({ message: 'Measurement added successfully' });
});


router.get('/history/:userId', measurements_Mid.getHistory, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'history.html'));
});

module.exports = router;
