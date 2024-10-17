import mongoose from "mongoose";
const mongoURI = process.env.MONGOURL; // Local MongoDB

// Connect to MongoDB
const MongoDBConn = mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
export default MongoDBConn;