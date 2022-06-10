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
    res.sendStatus(500);
  }
}

export async function getURL(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT id, "shortUrl", url FROM urls WHERE "userId" = $1`,
      [id]
    );

    const url = result.rows[0];

    if (!result.rows[0]) {
      return res.sendStatus(404);
    }

    res.status(200).send(url);
  } catch (e) {
    console.log("erro ao pegar a url do id", id);
    res.sendStatus(500);
  }
}

export async function openURL(req, res) {
  const { shortUrl } = req.params;
  try {
    const result = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [
      shortUrl,
    ]);

    if (!result.rows[0]) {
      return res.sendStatus(404);
    }
    const url = result.rows[0].url;

    const updateVisits = await db.query(
      `UPDATE urls
      SET visits = visits + 1
      WHERE "shortUrl" = $1
      `,
      [shortUrl]
    );

    res.redirect(url);
  } catch (e) {
    console.log("erro ao abrir a url", e);
    res.sendStatus(500);
  }
}
