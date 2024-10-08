import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/usersRoute.js";
import mongoose from "mongoose";

const app = express();

// Middleware (body eke thiyena ewa piliwelakata(encrypted ewa) hadanawa)
app.use(bodyParser.json());

//mongoDB Database Connection
const connectionString = "mongodb+srv://user:1234@cluster0.hfstw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//mongoose connection with mongoDB
mongoose.connect(connectionString).then(
    () => {
    console.log("Connected to MongoDB"); 
});

//userRouter
app.use("/api/users", userRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});