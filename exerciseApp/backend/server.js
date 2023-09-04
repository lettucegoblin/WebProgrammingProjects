const express = require('express');
const router = express.Router();
const app = express();

// Import Config
const config = require('./config.json');
const LISTEN_IP = config.listenIP;
const LISTEN_PORT = config.listenPort;

// Middleware to parse JSON request bodies
app.use(express.json());

// Import the routes
const exerciseRouter = require('./routes/exercises');

// Load routes on the app
app.use('/exercises', exerciseRouter);

// Start the server
app.listen(LISTEN_PORT, () => {
    console.log(`Server listening at http://${LISTEN_IP}:${LISTEN_PORT}/`);
});