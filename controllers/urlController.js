import db from "../database/db.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals;
  const shortUrl = nanoid(8);

  try {
    const result = await db.query(
      `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`,
      [userId, url, shortUrl]
    );

    res.status(201).send({ shortUrl: shortUrl });
  } catch (e) {
    console.log("erro ao encurtar", { userId });
    res.status(500).send("Erro ao encurtar url");
  }
}

