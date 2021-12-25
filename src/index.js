const express = require("express");
const app = express();
const courseRouter = require("./routers/course");
const loggerMiddleware = require("./middlewares");
const createConnection = require("./db");
const Course = require("./models/course");

createConnection()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});

app.use(loggerMiddleware);
app.use("/api/courses", courseRouter);
