const mongoose = require("mongoose");

const url =
  "mongodb+srv://hassanaleem86:9w360EvHaPn0bxF7@task-manager.6jdxixg.mongodb.net/?retryWrites=true&w=majority";

// Database Name
// const dbName = 'task-manager';

const connectDB = async () => {
  // Use connect method to connect to the server
  try {
    await mongoose.connect(url);
    console.log(`MongoDB Connected!`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
