import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/usersRoute.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware (body eke thiyena ewa piliwelakata(encrypted ewa) hadanawa)
app.use(bodyParser.json());

//mongoDB Database Connection
const connectionString = process.env.MONGO_URL;

//middleware for token verification (authentication middleware)
app.use((req, res, next) => {

    const token = req.headers["authorization"]?.replace("Bearer ", "");


    if (token != null) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (decoded != null) {
                req.user = decoded;
                
                next();
            } else {
                next();
            }
        });
    }else{
        next();
    }

});


mongoose.connect(connectionString).then(
    () => {
        console.log("Connected to MongoDB");
    });

//userRouter
app.use("/api/users", userRouter);

//galleryItemRouter
app.use("/api/gallery", galleryItemRouter);

//categoryRouter
app.use("/api/category", categoryRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});