import { pool } from './connection';
import { logger } from '../logger';
import type { AccessCode } from './types';

export async function saveAccessCode(data: AccessCode) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    await connection.execute(
      'INSERT INTO access_codes (id, client_id, code, expires_at) VALUES (?, ?, ?, ?)',
      [data.id, data.clientId, data.code, data.expiresAt]
    );

    await connection.commit();
    logger.info('Access code created successfully', { codeId: data.id });
    
    return data.code;
  } catch (error) {
    await connection.rollback();
    logger.error('Failed to create access code', { error, data });
    throw error;
  } finally {
    connection.release();
  }
}

export async function validateAccessCode(code: string): Promise<boolean> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM access_codes WHERE code = ? AND expires_at > NOW() AND is_used = FALSE',
      [code]
    );
    return (rows as any[]).length > 0;
  } catch (error) {
    logger.error('Failed to validate access code', { error, code });
    return false;
  }
}