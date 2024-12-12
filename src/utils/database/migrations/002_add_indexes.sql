-- Add additional indexes for better performance
ALTER TABLE clients ADD INDEX idx_created_at (created_at);
ALTER TABLE projects ADD INDEX idx_client_status (client_id, status);
ALTER TABLE access_codes ADD INDEX idx_expires_at (expires_at);
ALTER TABLE access_codes ADD INDEX idx_client_expires (client_id, expires_at);