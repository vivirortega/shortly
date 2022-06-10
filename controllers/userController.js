import db from "../database/db.js";

export async function getUser(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT users.id, users.name, SUM(COALESCE(urls.visits, 0)) AS "visitCount" FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        WHERE users.id = $1
        GROUP BY users.id`,
      [id]
    );

    if (!result.rows[0]) {
      return res.sendStatus(404);
    }

    const users = result.rows;

    const shortUrls = await db.query(
      `SELECT id, "shortUrl", url, visits AS "visitCount" FROM urls WHERE "userId"=$1`,
      [id]
    );

    const shortenedUrls = shortUrls.rows;

    res.status(200).send({ ...users, shortenedUrls });
  } catch (e) {
    console.log("erro ao pegar os usuários", e);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const result =
      await db.query(`SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(COALESCE(urls.visits, 0)) AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;`);

    const ranking = result.rows;
    res.status(200).send(ranking);
  } catch (e) {
    console.log("erro ao pegar os usuários", e);
    res.sendStatus(500);
  }
}
