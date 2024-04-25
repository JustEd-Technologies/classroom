const express = require("express");

const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
// This allows the server to accept requests from different origins
// and prevents browser security restrictions on cross-origin requests
app.use(cors());

// Middleware to limit the rate of requests to prevent abuse or DoS attacks
// This middleware sets a limit on the number of requests a client can make
// within a specified time window (windowMs) and blocks further requests
// if the limit is exceeded (max)
app.use(rateLimit({ windowMs: 1000, max: 10 }));

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to JustEd Server!");
});

// Start the server
const server = app.listen(port, () => {
    console.log(`JustEd Server listening on: http://localhost:${port}`);
});

// Handle uncaught exceptions gracefully
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Error: ${err}`);
    // You might want to do more here, like logging and cleaning up resources
    process.exit(1); // Exit with failure status
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
    console.log('Server is shutting down...');
    server.close(() => {
        console.log('Server shut down gracefully');
        process.exit(0); // Exit with success status
    });
});