import { Router } from "express";
import {
  shortenUrl,
  getURL,
  openURL,
  deleteURL,
} from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validUrl } from "../middlewares/deleteMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, shortenUrl);
urlRouter.get("/urls/:id", getURL);
urlRouter.get("/urls/open/:shortUrl", openURL);
urlRouter.delete("/urls/:id", validateToken, validUrl, deleteURL);

export default urlRouter;
