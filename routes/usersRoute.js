import express from "express";
import { postUser, updateUser, deleteUser, loginUser, getUser ,getAllUsers, createAdmin } from "../controllers/userControllers.js";

const userRouter = express.Router();

//get users
userRouter.get("/", getUser);

//get all users
userRouter.post("/all",getAllUsers);

//signup user
userRouter.post("/", postUser);

//create in admin panel user
userRouter.post("/newuser", createAdmin);

//update user
userRouter.put("/", updateUser);

//delete user
userRouter.delete("/delete/:id", deleteUser);

//user login
userRouter.post("/login", loginUser);

export default userRouter;