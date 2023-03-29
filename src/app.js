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