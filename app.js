import express from 'express';
import dotenv from 'dotenv';
import router from './routers/index.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(`Running At http://localhost:${process.env.APP_PORT}`);
});
