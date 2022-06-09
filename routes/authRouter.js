import { Router } from "express";
import { signup, signin } from "../controllers/authController.js";
import { validHeader, validLogin } from "../middlewares/userMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validHeader, signup);
authRouter.post("/signin", validLogin, signin);

export default authRouter;
