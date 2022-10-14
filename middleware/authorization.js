import db from '../config/db.js';

export const authorization = async (req, res, next) => {
  const reflectionsId = +req.params.reflectionsId;
  if (isNaN(reflectionsId)) {
    return res.status(401).json({
      name: 'Invalid Credential',
      devMessage: `Reflections id must be integer`,
    });
  }
  const authenticatedOwner = res.locals.owner;
  try {
    let reflections = await db.query(
      `SELECT * FROM reflections WHERE id = $1`,
      [parseInt(reflectionsId)]
    );
    if (reflections.rows.length == 0) {
      return res.status(404).json({
        name: 'Data Not Found',
        devMessage: `Reflections with id ${reflectionsId} not found`,
      });
    }
    if (reflections.rows[0].owner_id === authenticatedOwner) {
      return next();
    } else {
      return res.status(403).json({
        name: 'Authorization Error',
        devMessage: `Owner with id ${authenticatedOwner} does not have permission to access Reflections with id ${reflectionsId}`,
      });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
