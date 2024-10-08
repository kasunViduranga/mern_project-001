import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/usersRoute.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();

// Middleware (body eke thiyena ewa piliwelakata(encrypted ewa) hadanawa)
app.use(bodyParser.json());

//mongoDB Database Connection
const connectionString = "mongodb+srv://user:1234@cluster0.hfstw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//middleware for token verification
// app.use((req, res, next) => {

//     const token = req.headers("authorization") ?. replace("Bearer ", "")

//     if (token == null) {
//         jwt.verify(token, "secretkey", (err, decoded) => {
//             if (decoded == null) {
//                 req.user = decoded;
//             } else {
//                 next();
//             }
//         });
//     }

// });

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