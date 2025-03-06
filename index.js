const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db_M = require('./database');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 7320;

global.db_pool = db_M.pool;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


const users_R = require('./Routers/users_R');
const measurements_R = require('./Routers/measurements_R');
app.use('/users', users_R);
app.use('/measurements', measurements_R);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.get('/measurements', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'measurements.html'));
});

app.get('/history/:userId', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'history.html'));
});


const doc = {
    info: {
        title: 'Blood Pressure Tracker API',
        description: 'API for tracking blood pressure measurements'
    },
    host: `localhost:${port}`
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
    const swaggerDocument = require('./swagger-output.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
