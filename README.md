# pino-fluentd

[![js-standard-style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat)](https://github.com/iamturns/eslint-config-airbnb-typescript)

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
