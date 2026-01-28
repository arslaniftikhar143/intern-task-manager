const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const taskRoutes = require("./routes/task.routes");
const { connectDB } = require("./config/db");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("hello from middleware 1");
  next();
});

const port = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Api listening on port http://localhost:${port}`);
});
