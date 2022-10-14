import db from '../config/db.js';
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      name: 'Invalid Credential',
      devMessage: `There is an empty field`,
    });
  }

  try {
    let result = await db.query(
      `SELECT * FROM users WHERE email=$1`,
      [String(email)]
    );
    if (result.rows.length == 0)
      return res.status(400).json({
        name: 'User Login Error',
        devMessage: `User with email ${email} not found`,
      });

    if (result.rows[0].password != String(password))
      return res.status(400).json({
        name: 'User Login Error',
        devMessage: `User's password with email ${email} does not match`,
      });

    const accessToken = jwt.sign(
      { id: result.rows[0].id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(201).json({ accessToken });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const Register = async (req, res) => {
  const { email, password } = req.body;
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email || !password) {
    return res.status(401).json({
      name: 'Invalid Credential',
      devMessage: `There is an empty field`,
    });
  } else if (!email.match(mailformat)) {
    return res.status(409).json({
      name: 'Validation Failed',
      devMessage: `Email address ${email} is invalid`,
    });
  }

  try {
    const checkEmail = await db.query(
      `SELECT * FROM users WHERE email=$1`,
      [String(email)]
    );

    if (checkEmail.rows.length > 0)
      return res.status(409).json({
        name: 'Validation Failed',
        devMessage: `Email address ${email} is already exists`,
      });

    const result = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [String(email), String(password)]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
