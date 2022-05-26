import Pino from 'pino';
import pinoFluentd from '../src';

const streamToFluentd = pinoFluentd({
  index: 'test-index-%{DATE}',
  host: 'localhost',
  port: 24224,
  client: {
    milliseconds: true,
    eventRetry: {},
    flushInterval: 10,
  },
});

const logger = Pino({ level: 'info' }, streamToFluentd);

describe('Test Pino to Fluent', () => {
  it('should ', (done) => {
    for (let index = 0; index < 10; index++) {
      logger.info(`hello world ${index}`);
    }
    done();
  });

  afterAll((done) => {
    streamToFluentd.end();
    done();
  });
});
