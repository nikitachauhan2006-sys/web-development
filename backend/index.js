require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

const connectDB = require("./conn");

connectDB();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://web-development-yqz2-git-main-nikita-c2ec.vercel.app",
      "https://web-development-6q3z.vercel.app",
    ],
  })
);

const UserRoutes = require("./Routes/user");
app.use("/api/user", UserRoutes);

const ResumeRoutes = require("./Routes/resume");
app.use("/api/resume", ResumeRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log("Backend is running on port", PORT);
});