import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
dotenv.config();

// Routes
import routes from "./app/routes/api.js"

// import mockInsertions from "./app/mock/mockInserter.js";
const app = express();

app.use(cors());

app.use("/oneshot-ai",routes)

// database connection
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(process.env.PORT || 2021, () => {
  console.log("Server is up on port 2021");
});
