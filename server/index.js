import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();

const app = express();

// Configure CORS
const corsOptions = {
  origin: 'https://dynamichealth.netlify.app', // Your frontend application's origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/user/", UserRoutes);
// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developer",
  });
});

const connectDB = () => {
  const uri = process.env.MONGODB_URI; // Retrieve the MongoDB URI from environment variables

  return mongoose.connect(uri, {
    dbName: 'fitness',
  }).then((c) => {
    console.log(`DB Connected to ${c.connection.host}`);
    return c;
  }).catch((e) => {
    console.error('DB connection error:', e);
    throw e;
  });
};


const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
