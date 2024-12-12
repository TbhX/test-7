import mysql from 'mysql2/promise';
import { DB_CONFIG } from '@/config/database';

// Create connection pool
const pool = mysql.createPool({
  ...DB_CONFIG,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function createClient(data: {
  id: string;
  name: string;
  email: string;
  company?: string;
}) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute(
      'INSERT INTO clients (id, name, email, company) VALUES (?, ?, ?, ?)',
      [data.id, data.name, data.email, data.company || null]
    );

    await connection.commit();
    return data.id;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function createProject(data: {
  id: string;
  clientId: string;
  description: string;
  timeline: string;
}) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute(
      'INSERT INTO projects (id, client_id, description, timeline) VALUES (?, ?, ?, ?)',
      [data.id, data.clientId, data.description, data.timeline]
    );

    await connection.commit();
    return data.id;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function saveAccessCode(data: {
  id: string;
  clientId: string;
  code: string;
  expiresAt: Date;
}) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute(
      'INSERT INTO access_codes (id, client_id, code, expires_at) VALUES (?, ?, ?, ?)',
      [data.id, data.clientId, data.code, data.expiresAt]
    );

    await connection.commit();
    return data.code;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function validateAccessCode(code: string): Promise<boolean> {
  const [rows] = await pool.execute(
    'SELECT * FROM access_codes WHERE code = ? AND expires_at > NOW() AND is_used = FALSE',
    [code]
  );
  return (rows as any[]).length > 0;
}

export async function getClientByEmail(email: string) {
  const [rows] = await pool.execute(
    'SELECT * FROM clients WHERE email = ?',
    [email]
  );
  return (rows as any[])[0] || null;
}