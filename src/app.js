const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.port || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/tasks", require("./routes/taskRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
