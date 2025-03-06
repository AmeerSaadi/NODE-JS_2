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
