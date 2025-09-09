
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userR from "./routes/userR.js";
import resumeR from "./routes/resumeR.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());


app.use("/api/users", userR);
app.use("/api/resumes", resumeR);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

