import split from 'split2';
import { FluentClient, FluentClientOptions } from '@fluent-org/logger';
import { EventRecord } from '@fluent-org/logger/build/src/protocol';

export type PinoFluentConfigs = {
  /** Fluent Host */
  host: string;
  /** Fluent Port */
  port?: number;
  /** Index Name */
  index?: string;
  /** Client Options */
  client?: FluentClientOptions;
};

/**
 * Parse index name
 */
function parseIndexName(index: string) {
  const date = new Date().toISOString().substring(0, 10);
  return index.replace('%{DATE}', date);
}

/**
 * Set date time string
 */
function setDateTimeString(value: any) {
  // eslint-disable-next-line no-prototype-builtins
  if (typeof value === 'object' && value.hasOwnProperty('time')) {
    if (
      (typeof value.time === 'string' && value.time.length)
      || (typeof value.time === 'number' && value.time >= 0)
    ) {
      return new Date(value.time).toISOString();
    }
  }
  return new Date().toISOString();
}

/**
 * Pino Fluent transport
 * @param opts Options
 */
function PinoFluent(opts: PinoFluentConfigs) {
  const index = opts.index ? parseIndexName(opts.index) : 'pino.fluentd';

  const client = new FluentClient(index, {
    ...opts.client,
    socket: {
      host: opts.host,
      port: opts.port || 24224,
    },
  });

  const splitter = split(
    (line: string) => {
      let value: EventRecord;

      try {
        value = JSON.parse(line);
      } catch (error) {
        client.emit('error', error);
        return;
      }

      if (value['@timestamp'] === undefined) {
        value['@timestamp'] = setDateTimeString(value);
      }

      client.emit('insert', value);
    },
    { autoDestroy: true },
  );

  return splitter;
}

module.exports = PinoFluent;
