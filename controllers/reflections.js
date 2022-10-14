import db from '../config/db.js';

export const createReflections = async (req, res) => {
  const { success, low_point, take_away } = req.body;

  if (!success || !low_point || !take_away) {
    return res.status(401).json({
      name: 'Invalid Credential',
      devMessage: `There is an empty field`,
    });
  }

  const owner = res.locals.owner;
  try {
    const result = await db.query(
      'INSERT INTO reflections (success, low_point, take_away, owner_id, created_date, modified_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        String(success),
        String(low_point),
        String(take_away),
        owner,
        new Date(),
        new Date(),
      ]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getReflections = async (req, res) => {
  const owner = res.locals.owner;
  try {
    const result = await db.query(
      `SELECT * FROM reflections WHERE owner_id=$1`,
      [parseInt(owner)]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const updateReflections = async (req, res) => {
  let reflectionsId = +req.params.reflectionsId;
  let { success, low_point, take_away } = req.body;

  if (!success || !low_point || !take_away) {
    return res.status(401).json({
      name: 'Invalid Credential',
      devMessage: `There is an empty field`,
    });
  }

  try {
    await db.query(
      'UPDATE reflections SET success=$1, low_point=$2, take_away=$3, modified_date=$4 WHERE id=$5',
      [
        String(success),
        String(low_point),
        String(take_away),
        new Date(),
        parseInt(reflectionsId),
      ]
    );
    return res
      .status(200)
      .json({ msg: 'Reflection Successfully Updated' });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const deleteReflections = async (req, res) => {
  let reflectionsId = +req.params.reflectionsId;
  try {
    await db.query(`DELETE FROM reflections WHERE id=$1`, [
      parseInt(reflectionsId),
    ]);
    return res
      .status(200)
      .json({ msg: 'Reflections Removed Successfully' });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
