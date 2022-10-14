import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project1_db',
  password: 'admin',
  port: '5432',
});

export default pool;
