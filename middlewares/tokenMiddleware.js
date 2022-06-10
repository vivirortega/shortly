import db from "../database/db.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  try {

    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      console.log("erro na primeira validação", token);
      return res.sendStatus(401);
    }

    const checkUser = await db.query(`SELECT * FROM sessions WHERE token=$1`, [
      token,
    ]);

    const userId = checkUser.rows[0];
    
    if (!checkUser.rows[0]) {
      console.log("erro na segunda validação", token);
      return res.sendStatus(401);
    }

    res.locals.userId = checkUser.rows[0];
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
