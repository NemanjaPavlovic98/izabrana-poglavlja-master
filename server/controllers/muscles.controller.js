const db = require("../db/index");

async function getMuscles(req, res, next) {
  try {
    const result = await db.query(
      `select * from grupa_misica`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleMuscles(req, res, next) {
    try {
      const result = await db.query(
        `select gm.id, gm.naziv from vezba_misic vm join grupa_misica gm
        on vm.id_misica = gm.id where vm.id_vezbe = ($1)`,
        [req.params.id]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  }

module.exports = { getMuscles, getSingleMuscles };
