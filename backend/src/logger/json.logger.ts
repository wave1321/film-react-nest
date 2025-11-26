import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const logEntry: any = {
      timestamp: new Date().toISOString(),
      level,
      message: typeof message === 'object' ? JSON.stringify(message) : message,
    };

    if (this.context) {
      logEntry.context = this.context;
    }

    if (optionalParams.length > 0) {
      logEntry.params = optionalParams;
    }

    return JSON.stringify(logEntry);
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.info(this.formatMessage('verbose', message, ...optionalParams));
  }
}
