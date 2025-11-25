import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should format log message as JSON', () => {
    const testMessage = 'Test message';
    logger.log(testMessage);

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);

    const loggedMessage = consoleLogSpy.mock.calls[0][0];
    const parsedLog = JSON.parse(loggedMessage);

    expect(parsedLog).toHaveProperty('timestamp');
    expect(parsedLog).toHaveProperty('level', 'log');
    expect(parsedLog).toHaveProperty('message', testMessage);
  });

  it('should include context in JSON when set', () => {
    logger.setContext('TestContext');
    logger.log('Test message');

    const loggedMessage = consoleLogSpy.mock.calls[0][0];
    const parsedLog = JSON.parse(loggedMessage);

    expect(parsedLog.context).toBe('TestContext');
  });

  it('should handle object messages', () => {
    const testObject = { key: 'value', number: 123 };
    logger.log(testObject);

    const loggedMessage = consoleLogSpy.mock.calls[0][0];
    const parsedLog = JSON.parse(loggedMessage);

    expect(parsedLog.message).toBe(JSON.stringify(testObject));
  });

  it('should include optional parameters', () => {
    logger.log('Test message', 'param1', 123);

    const loggedMessage = consoleLogSpy.mock.calls[0][0];
    const parsedLog = JSON.parse(loggedMessage);

    expect(parsedLog.params).toEqual(['param1', 123]);
  });

  it('should handle error level', () => {
    logger.error('Error message');

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    const loggedMessage = consoleErrorSpy.mock.calls[0][0];
    const parsedLog = JSON.parse(loggedMessage);

    expect(parsedLog.level).toBe('error');
  });
});
