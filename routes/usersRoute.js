import express from "express";
import { getUsers, postUser, updateUser, deleteUser, loginUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

//get all users
userRouter.get("/", getUsers);

//create user
userRouter.post("/", postUser);

//update user
userRouter.put("/", updateUser);

//delete user
userRouter.delete("/", deleteUser);

//user login
userRouter.post("/login", loginUser);

export default userRouter;