import urlSchema from "../schemas/urlSchema.js";

export async function validUrl(req, res, next) {
    const url = req.body;
    const validation = urlSchema.validate(url);
    if (validation.error) {
      res.sendStatus(422);
      return;
    }
    next();
  }