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

export async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [
        user.id,
        token,
      ]);
      res.status(200).send(token);
    } else {
      return res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(500);
    console.log("Erro ao entrar no app", e);
  }
}
