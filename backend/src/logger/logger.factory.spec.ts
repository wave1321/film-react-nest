import { LoggerFactory } from './logger.factory';
import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

describe('LoggerFactory', () => {
  beforeEach(() => {
    // Сохраняем оригинальное значение env
    process.env.LOGGER_TYPE = '';
  });

  it('should create DevLogger by default', () => {
    const logger = LoggerFactory.createLogger();
    expect(logger).toBeInstanceOf(DevLogger);
  });

  it('should create DevLogger for "dev" type', () => {
    const logger = LoggerFactory.createLogger('dev');
    expect(logger).toBeInstanceOf(DevLogger);
  });

  it('should create JsonLogger for "json" type', () => {
    const logger = LoggerFactory.createLogger('json');
    expect(logger).toBeInstanceOf(JsonLogger);
  });

  it('should create TskvLogger for "tskv" type', () => {
    const logger = LoggerFactory.createLogger('tskv');
    expect(logger).toBeInstanceOf(TskvLogger);
  });

  it('should create logger from env variable', () => {
    process.env.LOGGER_TYPE = 'json';
    const logger = LoggerFactory.createLoggerFromEnv();
    expect(logger).toBeInstanceOf(JsonLogger);
  });

  it('should default to DevLogger when env variable is not set', () => {
    const logger = LoggerFactory.createLoggerFromEnv();
    expect(logger).toBeInstanceOf(DevLogger);
  });
});
