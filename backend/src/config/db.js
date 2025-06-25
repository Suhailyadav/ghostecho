import mongoose from 'mongoose'
const connectDb = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGODB connected: ${conn.connection.host}`);
  } 
  catch (error) {
    console.error(error.message) ;
    process.exit();
  }
}

export default connectDb;