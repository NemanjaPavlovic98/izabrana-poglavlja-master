const db = require("../db/index");

async function getHistoryForUser(req, res, next) {
  try {
    const result = await db.query(
      `select iv.datum, iv.procenat, t.naziv as trening, v.naziv as vezba from istorija_vezbanja iv
      join trening t on t.id = iv.id_trening
      join vezba v on v.id = iv.id_vezba
      where iv.email = $1
      order by iv.id_istorije desc`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function createHistory(req, res, next) {
  try {
    const result = await db.query(
      `insert into istorija_vezbanja (email, id_vezba, id_trening, datum, procenat) values
      ($1, $2, $3, NOW(), $4)`,
      [
        req.body.email,
        req.body.id_exercise,
        req.body.id_training,
        req.body.percentage,
      ]
    );
    res.status(200).json({ succes: true });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHistoryForUser,
  createHistory,
};
