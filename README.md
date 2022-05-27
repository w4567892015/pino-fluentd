# pino-fluentd
[![ts-airbnb-style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat)](https://github.com/iamturns/eslint-config-airbnb-typescript) [![test](https://github.com/w4567892015/pino-fluentd/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/w4567892015/pino-fluentd/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/w4567892015/pino-fluentd/branch/main/graph/badge.svg?token=DA8QWNVEBZ)](https://codecov.io/gh/w4567892015/pino-fluentd) [![CodeQL](https://github.com/w4567892015/pino-fluentd/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/w4567892015/pino-fluentd/actions/workflows/codeql-analysis.yml) [![npm](https://github.com/w4567892015/pino-fluentd/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/w4567892015/pino-fluentd/actions/workflows/npm-publish.yml) [![npm version](https://badge.fury.io/js/@viewsonic-mvb%2Fpino-fluentd.svg)](https://badge.fury.io/js/@viewsonic-mvb%2Fpino-fluentd)

Load [pino](https://github.com/pinojs/pino) logs into [Fluentd](https://www.fluentd.org).

## Install

```
npm install @viewsonic-mvb/pino-fluentd
```

### Usage as module

```js
const pino = require('pino')
const pinoFluentd = require('@viewsonic-mvb/pino-fluentd')

const streamToFluentd = pinoFluentd({
  index: 'an-index-%{DATE}',
  host: 'localhost',
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
