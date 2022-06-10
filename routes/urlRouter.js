import { Router } from "express";
import { shortenUrl, getURL, openURL } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, shortenUrl);
urlRouter.get("/urls/:id", getURL);
urlRouter.get("/urls/open/:shortUrl", openURL);

export default urlRouter;
