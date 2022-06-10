import { Router } from "express";
import { shortenUrl } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, shortenUrl);

export default urlRouter;
