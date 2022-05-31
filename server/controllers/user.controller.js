const db = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { ExtractJwt } = require("passport-jwt");

// async function getTraining(req, res, next) {
//   try {
//     const result = await db.query(``, []);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     next(error);
//   }
// }

async function login(req, res, next) {
  const userFetch = await db.query(`select * from korisnik where email = $1`, [
    req.body.email,
  ]);

  const user = userFetch.rows[0];

  console.log("USER ", user);
  if (!user) return res.status(404).json({ message: "No such user" });

  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign(
      { email: user.email },
      "ewinrwonbrnbrbneoiboeibmteqmwvmrw",
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: user.email,
    });
  }
  return res.status(401).json({ message: "Wrong password" });
}
module.exports = { login };
