import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js"

const userRouter = Router();

userRouter.get("/users/:id", validateToken, getUser);

export default userRouter;
