import { pool } from './connection';
import { logger } from '../logger';
import type { Project } from './types';

export async function createProject(data: Project) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    await connection.execute(
      'INSERT INTO projects (id, client_id, description, timeline) VALUES (?, ?, ?, ?)',
      [data.id, data.clientId, data.description, data.timeline]
    );

    await connection.commit();
    logger.info('Project created successfully', { projectId: data.id });
    
    return data.id;
  } catch (error) {
    await connection.rollback();
    logger.error('Failed to create project', { error, data });
    throw error;
  } finally {
    connection.release();
  }
}