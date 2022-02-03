const express = require('express');
const InternalError = require('./common/exceptions/InternalError');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes/recordsRoutes.js');
const db = require('./db');
const morgan = require('morgan');
const port = process.env.PORT || 5000;
require('dotenv').config();

// Initialize express
const app = express();
app.use(bodyParser.json());
// Logs are always nice to have
app.use(morgan('dev'));
// Some protection
app.use(helmet());
// Default the output to json
app.use(express.json());
// Add the routes
app.use('/', router);
app.use('*', (req, res) =>
    res.status(404).json({ code: 1, msg: 'Page not found' })
);

// Connect to the database
db.connect(process.env.MONGO_URI)
    .then(() => {
        // Starts the server and listens on port 3000
        app.listen(port);
        console.log(`App listening on port ${port}`);
    })
    .catch((err) => {
        throw new InternalError('Server could not be initialized');
    });
