import mysql from 'mysql2/promise';
import secret from './config/secret';

const pool = mysql.createPool({
  host: secret.db_host,
  user: secret.db_user_name,
  password: secret.db_password,
  database: secret.db_name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Database connection successfully');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err:any) {
    console.error('Database connection failed:', err.message);
  }
};

export default pool;

