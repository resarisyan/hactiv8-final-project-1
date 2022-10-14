import jwt from 'jsonwebtoken';

export const authentication = (req, res, next) => {
  const authHeader = req.headers['x-access-token'];
  const token = authHeader;
  try {
    if (token == null)
      return res.status(401).json({
        name: 'Invalid Credential',
        devMessage: `Token must be filled`,
      });
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(401).json({
            name: 'Authentication Error',
            devMessage: `JWT Token is invalid`,
          });
        res.locals.owner = decoded.id;
        next();
      }
    );
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
