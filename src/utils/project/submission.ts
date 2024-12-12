import { customAlphabet } from 'nanoid';
import { createClient, createProject, saveAccessCode } from '../database';
import { sendEmail } from '../email/service';
import { generateAccessCodeEmail } from '../email/templates';
import { sendNewClientNotification } from '../email/notifications';
import { logger } from '../logger';
import type { ProjectFormData } from '@/types/project';

const generateId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 36);
const generateAccessCode = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 12);

export async function handleProjectSubmission(formData: ProjectFormData) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    logger.info('Starting project submission transaction', { email: formData.email });

    // Generate IDs
    const clientId = generateId();
    const projectId = generateId();
    const accessCode = generateAccessCode();

    // Set expiration for access code
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Create client record
    const client = {
      id: clientId,
      name: formData.name,
      email: formData.email,
      company: formData.company
    };
    await createClient(client);
    logger.info('Client created', { clientId });

    // Create project record
    const project = {
      id: projectId,
      clientId,
      description: formData.description || '',
      timeline: formData.timeline || 'normal'
    };
    await createProject(project);
    logger.info('Project created', { projectId });

    // Save access code
    await saveAccessCode({
      id: generateId(),
      clientId,
      code: accessCode,
      expiresAt
    });
    logger.info('Access code created', { accessCode });

    // Send emails
    const [clientEmailSent, supportEmailSent] = await Promise.all([
      // Send access code to client
      sendEmail({
        to: formData.email,
        subject: 'Votre Code d\'Accès au Tableau de Bord',
        html: generateAccessCodeEmail(formData.name, accessCode)
      }),
      // Send notification to support
      sendNewClientNotification(client)
    ]);

    await connection.commit();
    logger.info('Project submission completed successfully', {
      clientId,
      projectId,
      clientEmailSent,
      supportEmailSent
    });

    return {
      success: true,
      accessCode,
      emailSent: clientEmailSent
    };

  } catch (error) {
    await connection.rollback();
    logger.error('Project submission failed', { error, email: formData.email });
    
    return {
      success: false,
      error: 'Une erreur est survenue lors de la soumission du projet. Veuillez réessayer.'
    };
  } finally {
    connection.release();
  }
}