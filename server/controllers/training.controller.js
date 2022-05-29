const { json } = require("body-parser");
const db = require("../db/index");

async function getTraining(req, res, next) {
  try {
    const result = await db.query(
      `select t.*, t2.brojVezbi, t2.trajanje, t2.kalorije
      from trening t
      left join (
          select tv.id_trening, count(tv.*) brojVezbi, sum(tvv.trajanje) trajanje, sum(tvv.kalorije) kalorije
          from trening_vezba tv join vezba tvv
		      on tv.id_vezba = tvv.id
          group by id_trening
      ) t2 on t.id = t2.id_trening;`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleTraining(req, res, next) {
  try {
    const result = await db.query(`select * from trening where id = $1`, [
      req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function createTraining(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const url = req.protocol + "://" + req.get("host");
      let imagePath = req.body.image;
      if (typeof req.file !== "undefined") {
        imagePath = url + "/images/" + req.file.filename;
      } else {
        imagePath = null;
      }

      const trening = await db.query(
        `insert into trening (naziv, slika, jacina, opis, spreman, omiljeni)
        values ($1, $2, $3, $4, $5, $6) returning id`,
        [
          req.body.naziv,
          imagePath,
          req.body.jacina,
          req.body.opis,
          req.body.spreman,
          req.body.omiljeni,
        ]
      );

      if (req.body.vezbe.length > 0) {
        JSON.parse(req.body.vezbe).forEach(async (vezba) => {
          const insertStavkaText = `insert into trening_vezba values ($1, $2)`;
          await client.query(insertStavkaText, [trening.rows[0].id, vezba]);
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

async function updateTraining(req, res, next) {
  console.log(req.body)
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      let imagePath = req.body.image;
      if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
      }

      const deleteVezbeZaTrening = `DELETE FROM trening_vezba WHERE id_trening=$1`;
      await client.query(deleteVezbeZaTrening, [req.body.id]);

      if (req.body.vezbe.length > 0) {
        JSON.parse(req.body.vezbe).forEach(async (vezba) => {
          const insertStavkaText = `insert into trening_vezba values ($1, $2)`;
          await client.query(insertStavkaText, [req.body.id, vezba]);
        });
      }

      const trening = await db.query(
        `update trening set
        naziv = $1, slika = $2, jacina = $3, opis = $4, spreman = $5, omiljeni = $6
        where id = $7`,
        [
          req.body.naziv,
          imagePath,
          req.body.jacina,
          req.body.opis,
          req.body.spreman,
          req.body.omiljeni,
          req.body.id
        ]
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

async function deleteTraining(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const deleteTreningVezbeText= `DELETE FROM trening_vezba WHERE id_trening=$1`;
      await client.query(deleteTreningVezbeText, [+req.params.id]);

      const deleteTreningText = `DELETE FROM trening WHERE id=$1`;
      await client.query(deleteTreningText, [+req.params.id]);

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
  getTraining,
  getSingleTraining,
  createTraining,
  updateTraining,
  deleteTraining
};
