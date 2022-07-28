import split from 'split2';
import { FluentClient, FluentClientOptions } from '@fluent-org/logger';
import { EventRecord } from '@fluent-org/logger/build/src/protocol';

export type PinoFluentConfigs = {
  /** Fluent Host */
  host: string;
  /** Fluent Port. Default: 24224 */
  port?: number;
  /** Index Name. Default: pino.fluentd */
  index?: string;
  /** Client Options */
  client?: FluentClientOptions;
  label?: {
    log?: string;
  }
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

function emit(client: FluentClient, label: string, value: EventRecord) {
  if (label) {
    client.emit(label, value);
  } else {
    client.emit(value);
  }
}

/**
 * Pino Fluent transport
 * @param opts Options
 */
function PinoFluentd(opts: PinoFluentConfigs) {
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
        emit(client, 'error.parse', error);
        return;
      }

      if (value['@timestamp'] === undefined) {
        value['@timestamp'] = setDateTimeString(value);
      }

      emit(client, opts.label?.log, value);
    },
    { autoDestroy: true },
  );

  return splitter;
}

export default PinoFluentd;
