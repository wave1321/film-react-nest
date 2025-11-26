import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  private formatMessage(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    const entries: string[] = [
      `timestamp=${new Date().toISOString()}`,
      `level=${level}`,
      `message=${this.escapeValue(typeof message === 'object' ? JSON.stringify(message) : String(message))}`,
    ];

    if (this.context) {
      entries.push(`context=${this.escapeValue(this.context)}`);
    }

    if (optionalParams && optionalParams.length > 0) {
      optionalParams.forEach((param, index) => {
        if (typeof param === 'object') {
          Object.entries(param).forEach(([key, value]) => {
            entries.push(`${key}=${this.escapeValue(String(value))}`);
          });
        } else {
          entries.push(`param${index}=${this.escapeValue(String(param))}`);
        }
      });
    }

    return entries.join('\t') + '\n';
  }

  private escapeValue(value: string): string {
    return value
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\s/g, ' ');
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(
      this.formatMessage('error', message, ...optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('warn', message, ...optionalParams),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('debug', message, ...optionalParams),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('verbose', message, ...optionalParams),
    );
  }
}
