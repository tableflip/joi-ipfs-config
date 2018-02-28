# joi-ipfs-config

[![Build Status](https://travis-ci.org/tableflip/joi-ipfs-config.svg?branch=master)](https://travis-ci.org/tableflip/joi-ipfs-config)
[![dependencies Status](https://david-dm.org/tableflip/joi-ipfs-config/status.svg)](https://david-dm.org/tableflip/joi-ipfs-config)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Validate JS-IPFS config

Your flexible IPFS config validating friend. The following rationale is applied here:

1. This project shouldn't block new features landing in JS-IPFS. Object validation allows for unknown keys so that the feature can land, and validation for the config can be backfilled at a later date
2. Where a config value is an object, we allow `null` to be passed in its place
3. We are not in charge of defaults, that is for the module that uses the option to decide

## Install

```sh
npm install joi-ipfs-config
```

## Usage

```js
const Joi = require('joi').extend(require('joi-ipfs-config'))

const config = {
  config: {
    Addresses: {
      Swarm: [
        '/ip4/0.0.0.0/tcp/4002',
        '/ip4/127.0.0.1/tcp/4003/ws'
      ]
    }
  },
  EXPERIMENTAL: {
    pubsub: true,
    dht: true
  }
}

Joi.attempt(config, Joi.ipfsConfig()) // throws if invalid
```

## Contribute

Feel free to dive in! [Open an issue](https://github.com/tableflip/joi-ipfs-config/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
