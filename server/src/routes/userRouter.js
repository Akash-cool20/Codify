import express from "express";
import {  login,  logout,  signup,  userDetails,} from "../controllers/userController.js"; // Note the .mjs extension for ES Modules
import { verifyToken } from "../middlewares/verifyToken.js";
// import {verifyTokenAnonymous} from "../middlewares/verifyTokenAnonymous.js";
import { getMyCodes } from "../controllers/compilerController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.get("/user-details", verifyToken, userDetails);
userRouter.get("/my-codes", verifyToken, getMyCodes);

export { userRouter };
