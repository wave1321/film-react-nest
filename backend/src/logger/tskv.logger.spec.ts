import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutSpy: jest.SpyInstance;
  let stderrSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    stdoutSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
    stderrSpy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  });

  it('should format log message in TSKV format', () => {
    const testMessage = 'Test message';
    logger.log(testMessage);

    expect(stdoutSpy).toHaveBeenCalledTimes(1);

    const loggedMessage = stdoutSpy.mock.calls[0][0] as string;

    expect(loggedMessage).toContain('timestamp=');
    expect(loggedMessage).toContain('level=log');
    expect(loggedMessage).toContain('message=Test message');
    expect(loggedMessage).toMatch(
      /timestamp=.*\tlevel=log\tmessage=Test message\n/,
    );
  });

  it('should escape special characters in TSKV', () => {
    const testMessage = 'Test\tmessage\nwith\rspecial chars';
    logger.log(testMessage);

    const loggedMessage = stdoutSpy.mock.calls[0][0] as string;

    expect(loggedMessage).toContain(
      'message=Test\\tmessage\\nwith\\rspecial chars',
    );
  });

  it('should include context when set', () => {
    logger.setContext('TestContext');
    logger.log('Test message');

    const loggedMessage = stdoutSpy.mock.calls[0][0] as string;

    expect(loggedMessage).toContain('context=TestContext');
  });

  it('should handle object parameters', () => {
    const testObject = { key: 'value', number: 123 };
    logger.log('Test message', testObject);

    const loggedMessage = stdoutSpy.mock.calls[0][0] as string;

    expect(loggedMessage).toContain('key=value');
    expect(loggedMessage).toContain('number=123');
  });

  it('should send errors to stderr', () => {
    logger.error('Error message');

    expect(stderrSpy).toHaveBeenCalledTimes(1);

    const loggedMessage = stderrSpy.mock.calls[0][0] as string;

    expect(loggedMessage).toContain('level=error');
  });
});
