const db = require("../db/index");

async function getTrening(req, res, next) {
  try {
    const result = await db.query(
      `SELECT tv.*, t.naziv as trening, v.naziv as vezba, v.trajanje, v.kalorije
      FROM trening_vezba tv
      JOIN trening t on t.id = tv.id_trening
      JOIN vezba v on v.id = tv.id_vezba`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleTrening(req, res, next) {
  try {
    const result = await db.query(
      `SELECT tv.*, t.naziv as trening, v.naziv as vezba, v.trajanje, v.kalorije
      FROM trening_vezba tv
      JOIN trening t on t.id = tv.id_trening
      JOIN vezba v on v.id = tv.id_vezba where id_trening = $1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}


module.exports = { getTrening, getSingleTrening };
