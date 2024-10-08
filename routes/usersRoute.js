import express from "express";
import { getUsers, postUser, updateUser, deleteUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", postUser);
userRouter.put("/", updateUser);
userRouter.delete("/", deleteUser);

export default userRouter;