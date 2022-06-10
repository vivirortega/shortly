import { Router } from "express";
import { getUser, getRanking } from "../controllers/userController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js"

const userRouter = Router();

userRouter.get("/users/:id", validateToken, getUser);
userRouter.get("/ranking", getRanking);

export default userRouter;
