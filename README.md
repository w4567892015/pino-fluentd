# pino-fluentd

Load [pino](https://github.com/pinojs/pino) logs into [Fluentd](https://www.fluentd.org).

## Install

```
npm install pino-fluentd
```

### Usage as module

```js
const pino = require('pino')
const pinoFluentd = require('pino-fluentd')

const streamToFluentd = pinoFluentd({
  index: 'an-index-%{DATE}',
  host: 'http://localhost',
  port: 24224,
  client: {
    milliseconds: true,
    eventRetry: {},
    flushInterval: 1000,
  },
})

const logger = pino({ level: 'info' }, streamToFluentd)

logger.info('hello world')
// ...
```

## License

Licensed under [MIT](./LICENSE).
