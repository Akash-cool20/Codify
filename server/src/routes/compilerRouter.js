import express from "express";
import {  deleteCode,  editCode,  getAllCodes,  loadCode,  saveCode,} from "../controllers/compilerController.js"; // Note the .mjs extension for ES Modules
import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonymous.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const compilerRouter = express.Router();

compilerRouter.post("/save", verifyTokenAnonymous, saveCode);
compilerRouter.post("/load", verifyTokenAnonymous, loadCode);
compilerRouter.delete("/delete/:id", verifyToken, deleteCode);
compilerRouter.put("/edit/:id", verifyToken, editCode);
compilerRouter.get("/get-all-codes", getAllCodes);

export { compilerRouter };
