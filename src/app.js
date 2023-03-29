// const { MongoClient } = require('mongodb');

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url = 'mongodb+srv://hassanaleem86:9w360EvHaPn0bxF7@task-manager.6jdxixg.mongodb.net/?retryWrites=true&w=majority';
// const client = new MongoClient(url);

// Database Name
// const dbName = 'task-manager';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//     // the following code examples can be pasted here...

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

const express = require("express");
const connectDB = require("./config/db");
const port = process.env.port || 5000;
// const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/tasks", require("./routes/taskRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.get('/products', (req, res) => {
  res.send('testing!')
})


// app.use(errorHandler);
// console.log("Hello World");

app.listen(port, () => console.log(`Server running on port ${port}`));