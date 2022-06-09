import { v4 as uuid } from "uuid";
import db from "../database/db.js";
import bcrypt from "bcrypt";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const passwordEncrypted = bcrypt.hashSync(password, 10);

  try {
    const checkUser = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (checkUser.rowCount > 0) {
      return res.status(409).send("Email já cadastrado");
    }

    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordEncrypted]
    );
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
    console.log("Erro ao cadastrar", e);
  }
}
