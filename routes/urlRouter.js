import { Router } from "express";
import { shortenUrl, getURL } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, shortenUrl);
urlRouter.get("/urls/:id", getURL);

export default urlRouter;
