import { pool } from './connection';
import { logger } from '../logger';
import type { Client } from './types';

export async function createClient(data: Client, connection = pool) {
  try {
    const [result] = await connection.execute(
      'INSERT INTO clients (id, name, email, company) VALUES (?, ?, ?, ?)',
      [data.id, data.name, data.email, data.company || null]
    );

    logger.info('Client created successfully', { clientId: data.id });
    return data.id;
  } catch (error: any) {
    // Handle duplicate email error specifically
    if (error.code === 'ER_DUP_ENTRY') {
      logger.warn('Duplicate client email', { email: data.email });
      throw new Error('Un compte existe déjà avec cette adresse email');
    }

    logger.error('Failed to create client', { error, data });
    throw error;
  }
}

export async function getClientByEmail(email: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM clients WHERE email = ?',
      [email]
    );
    return (rows as any[])[0] || null;
  } catch (error) {
    logger.error('Failed to get client by email', { error, email });
    throw error;
  }
}