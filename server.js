// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle connection events
io.on('connection', (socket) => {
    console.log('A user connected');

    // Broadcast a message to all clients
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const socket = io('https://your-app-name.vercel.app'); // Use the deployed URL

