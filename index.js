const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/task.routes");

const port = process.env.PORT || 3000;

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL);
}

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

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
