 
import express from "express"
import { addUser, getAllUsers, updateUser } from "../controller/user.controller.js";
const userRouter = express.Router()

 
userRouter.post("/user", addUser);
userRouter.get("/user/", getAllUsers);
userRouter.put("/user/:id", updateUser);

export default userRouter;
