import mongoose from "mongoose";
const mongoURI = process.env.MONGOURL; // Local MongoDB
// If using MongoDB Atlas, use something like:
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Connect to MongoDB
const MongoDBConn = mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
export default MongoDBConn;