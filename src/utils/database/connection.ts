import mysql from 'mysql2/promise';
import { DB_CONFIG } from '@/config/database';
import { logger } from '../logger';

// Create connection pool with retry mechanism
export const pool = mysql.createPool({
  ...DB_CONFIG,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection with retry
async function testConnection(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      logger.info('Database connection established successfully');
      
      await connection.query('SELECT 1');
      logger.info('Database query executed successfully');
      
      connection.release();
      return;
    } catch (error) {
      logger.error(`Database connection attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Initialize connection
testConnection().catch(error => {
  logger.error('Failed to initialize database connection:', error);
  process.exit(1);
});

export default pool;