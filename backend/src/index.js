import dotenv from 'dotenv';
import http from 'http';
import app from './server.js'
import connectDb from './config/db.js'
import { Server } from 'socket.io'
import initSocketServer from './socket/index.js'

const PORT = process.env.PORT || 5000;
console.log(PORT)

dotenv.config('../.env');

const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", // In production, specify frontend URL
    methods: ["GET", "POST"]
  }
});

// Call our socket handler
initSocketServer(io);

// Connect to DB and start server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error(`Failed to start Server: ${err.message}`)
})
