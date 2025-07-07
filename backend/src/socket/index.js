import jwt from 'jsonwebtoken';

const onlineUsers = new Map(); // userId => socket.id

export default function initSocketServer(io) {
  io.on('connection', (socket) => {
    console.log(`⚡ New socket connected: ${socket.id}`);

    // Get userId from token (if passed)
    socket.on('setup', ({ token }) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        onlineUsers.set(userId, socket.id);
        socket.join(userId);
        console.log(`✅ User ${userId} joined with socket ${socket.id}`);
      } catch (err) {
        console.error('Invalid JWT in socket:', err.message);
      }
    });

    // Handle sending messages
    socket.on('send-message', ({ to, message }) => {
      if (onlineUsers.has(to)) {
        const receiverSocketId = onlineUsers.get(to);
        io.to(receiverSocketId).emit('receive-message', message);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      for (const [userId, sockId] of onlineUsers) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });
}
