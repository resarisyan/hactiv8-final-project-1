import express from 'express';
import { Login, Register } from '../controllers/users.js';
import {
  createReflections,
  getReflections,
  updateReflections,
  deleteReflections,
} from '../controllers/reflections.js';
import { authentication } from '../middleware/authentication.js';
import { authorization } from '../middleware/authorization.js';
const router = express.Router();
router.post('/api/v1/users/login', Login);
router.post('/api/v1/users/register', Register);
router.post('/api/v1/reflections', authentication, createReflections);
router.get('/api/v1/reflections', authentication, getReflections);
router.put(
  '/api/v1/reflections/:reflectionsId',
  authentication,
  authorization,
  updateReflections
);
router.delete(
  '/api/v1/reflections/:reflectionsId',
  authentication,
  authorization,
  deleteReflections
);

router.use((req, res, next) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = process.env.APP_PORT;
  const fullUrl = `${protocol}://${host}:${port}${url}`;
  res.status(404).send({
    devMessage: `Route ${fullUrl} Not Found`,
  });
});
export default router;
