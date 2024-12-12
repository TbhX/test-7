type LogLevel = 'info' | 'error' | 'warn';

interface LogData {
  [key: string]: any;
}

class Logger {
  private log(level: LogLevel, message: string, data?: LogData) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...data
    };

    switch (level) {
      case 'error':
        console.error(JSON.stringify(logEntry));
        break;
      case 'warn':
        console.warn(JSON.stringify(logEntry));
        break;
      default:
        console.log(JSON.stringify(logEntry));
    }
  }

  info(message: string, data?: LogData) {
    this.log('info', message, data);
  }

  error(message: string, data?: LogData) {
    this.log('error', message, data);
  }

  warn(message: string, data?: LogData) {
    this.log('warn', message, data);
  }
}

export const logger = new Logger();