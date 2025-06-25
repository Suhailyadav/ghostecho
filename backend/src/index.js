import dotenv from 'dotenv';
import app from './server.js'
import connectDb from './config/db.js'

const PORT = process.env.PORT || 5000;
console.log(PORT)

dotenv.config('../.env');

// Connect to DB and start server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error(`Failed to start Server: ${err.message}`)
})
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
//   });