const db = require("../db/index");

async function getVezbeZaTrening(req, res, next) {
  try {
    const result = await db.query(
      `select tv.id_vezba, v.* from trening t join trening_vezba tv
      on t.id = tv.id_trening 
    join vezba v on tv.id_vezba = v.id
  where t.id = $1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getExercise(req, res, next) {
  try {
    const result = await db.query(`select * from vezba`, []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleExercise(req, res, next) {
  try {
    const result = await db.query(`select * from vezba where id = $1`, [req.params.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function createExercise(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const vezba = await db.query(
        `insert into vezba(trajanje, kalorije, naziv)
        values ($1, $2, $3) returning id`,
        [req.body.trajanje, req.body.kalorije, req.body.naziv]
      );

      if (req.body.grupa_misica.length > 0) {
        req.body.grupa_misica.forEach(async (misic) => {
          const insertStavkaText = `insert into vezba_misic values ($1, $2)`;
          await client.query(insertStavkaText, [vezba.rows[0].id, misic]);
        });
      }
      await client.query("COMMIT");
      res.status(200).json({ succes: true });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.status(e.status || 500);
    res.json({ message: e.message });
  });
}

async function updateExercise(req, res, next) {
  console.log(req.body);
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(`DELETE FROM vezba_misic WHERE id_vezbe=$1`, [
        req.body.id,
      ]);

      console.log(req.body);
      if (req.body.grupa_misica.length > 0) {
        req.body.grupa_misica.forEach(async (misic) => {
          const insertStavkaText = `insert into vezba_misic values ($1, $2)`;
          await client.query(insertStavkaText, [req.body.id, misic]);
        });
      }

      await db.query(
        `update vezba set
        trajanje = $1, kalorije = $2, naziv = $3
        where id = $4`,
        [req.body.trajanje, req.body.kalorije, req.body.naziv, req.body.id]
      );

      await client.query("COMMIT");
      res.status(200).json({ succes: true });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.status(e.status || 500);
    res.json({ message: e.message });
  });
}

async function deleteExercise(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(`DELETE FROM vezba_misic WHERE id_vezbe=$1`, [
        +req.params.id,
      ]);

      await client.query(`DELETE FROM vezba WHERE id=$1`, [+req.params.id]);

      await client.query("COMMIT");
      res.status(200).json({ succes: true });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.status(e.status || 500);
    res.json({ message: e.message });
  });
}

module.exports = {
  getVezbeZaTrening,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  getSingleExercise
};
