const test = require('ava')
const Joi = require('joi').extend(require('./'))

test('should allow empty config', (t) => {
  const config = {}
  t.notThrows(() => Joi.attempt(config, Joi.ipfsConfig().required()))
})

test('should allow undefined config', (t) => {
  const config = undefined
  t.notThrows(() => Joi.attempt(config, Joi.ipfsConfig()))
})

test('should allow unknown key at root', (t) => {
  const config = { [`${Date.now()}`]: 'test' }
  t.notThrows(() => Joi.attempt(config, Joi.ipfsConfig().required()))
})

test('should validate valid repo', (t) => {
  const configs = [
    { repo: { unknown: 'value' } },
    { repo: '/path/to-repo' },
    { repo: null },
    { repo: undefined }
  ]

  configs.forEach(c => t.notThrows(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate invalid repo', (t) => {
  const configs = [
    { repo: 138 }
  ]

  configs.forEach(c => t.throws(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate valid init', (t) => {
  const configs = [
    { init: { bits: 138 } },
    { init: { bits: 138, unknown: 'value' } },
    { init: true },
    { init: false },
    { init: null },
    { init: undefined }
  ]

  configs.forEach(c => t.notThrows(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate invalid init', (t) => {
  const configs = [
    { init: 138 },
    { init: { bits: 'not an int' } }
  ]

  configs.forEach(c => t.throws(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate valid start', (t) => {
  const configs = [
    { start: true },
    { start: false },
    { start: undefined }
  ]

  configs.forEach(c => t.notThrows(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate invalid start', (t) => {
  const configs = [
    { start: 138 },
    { start: 'make it so number 1' },
    { start: null }
  ]

  configs.forEach(c => t.throws(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate valid pass', (t) => {
  const configs = [
    { pass: 'correctbatteryhorsestaple' },
    { pass: '' },
    { pass: undefined }
  ]

  configs.forEach(c => t.notThrows(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate invalid pass', (t) => {
  const configs = [
    { pass: 138 },
    { pass: null }
  ]

  configs.forEach(c => t.throws(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate valid EXPERIMENTAL', (t) => {
  const configs = [
    { EXPERIMENTAL: { pubsub: true, dht: true, sharding: true } },
    { EXPERIMENTAL: { pubsub: false, dht: false, sharding: false } },
    { EXPERIMENTAL: { unknown: 'value' } },
    { EXPERIMENTAL: null },
    { EXPERIMENTAL: undefined }
  ]

  configs.forEach(c => t.notThrows(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate invalid EXPERIMENTAL', (t) => {
  const configs = [
    { EXPERIMENTAL: { pubsub: 138 } },
    { EXPERIMENTAL: { dht: 138 } },
    { EXPERIMENTAL: { sharding: 138 } }
  ]

  configs.forEach(c => t.throws(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate valid config', (t) => {
  const configs = [
    { config: { Addresses: { Swarm: ['/ip4/0.0.0.0/tcp/4002'] } } },
    { config: { Addresses: { Swarm: [] } } },
    { config: { Addresses: { Swarm: undefined } } },

    { config: { Addresses: { API: '/ip4/127.0.0.1/tcp/5002' } } },
    { config: { Addresses: { API: undefined } } },

    { config: { Addresses: { Gateway: '/ip4/127.0.0.1/tcp/9090' } } },
    { config: { Addresses: { Gateway: undefined } } },

    { config: { Addresses: { unknown: 'value' } } },
    { config: { Addresses: null } },
    { config: { Addresses: undefined } },

    { config: { Discovery: { MDNS: { Enabled: true } } } },
    { config: { Discovery: { MDNS: { Enabled: false } } } },
    { config: { Discovery: { MDNS: { Interval: 138 } } } },
    { config: { Discovery: { MDNS: { unknown: 'value' } } } },
    { config: { Discovery: { MDNS: null } } },
    { config: { Discovery: { MDNS: undefined } } },

    { config: { Discovery: { webRTCStar: { Enabled: true } } } },
    { config: { Discovery: { webRTCStar: { Enabled: false } } } },
    { config: { Discovery: { webRTCStar: { unknown: 'value' } } } },
    { config: { Discovery: { webRTCStar: null } } },
    { config: { Discovery: { webRTCStar: undefined } } },

    { config: { Discovery: { unknown: 'value' } } },
    { config: { Discovery: null } },
    { config: { Discovery: undefined } },

    { config: { Bootstrap: ['/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z'] } },
    { config: { Bootstrap: [] } },

    { config: { unknown: 'value' } },
    { config: null },
    { config: undefined }
  ]

  configs.forEach(c => t.notThrows(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate invalid config', (t) => {
  const configs = [
    { config: { Addresses: { Swarm: 138 } } },
    { config: { Addresses: { Swarm: null } } },

    { config: { Addresses: { API: 138 } } },
    { config: { Addresses: { API: null } } },

    { config: { Addresses: { Gateway: 138 } } },
    { config: { Addresses: { Gateway: null } } },

    { config: { Discovery: { MDNS: { Enabled: 138 } } } },
    { config: { Discovery: { MDNS: { Interval: true } } } },

    { config: { Discovery: { webRTCStar: { Enabled: 138 } } } },

    { config: { Bootstrap: ['/ip4/0.0.0.0/tcp/4002'] } },
    { config: { Bootstrap: 138 } },

    { config: 138 }
  ]

  configs.forEach(c => t.throws(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate valid libp2p', (t) => {
  const configs = [
    { libp2p: { modules: {} } },
    { libp2p: { modules: { unknown: 'value' } } },
    { libp2p: { modules: null } },
    { libp2p: { modules: undefined } },
    { libp2p: { unknown: 'value' } },
    { libp2p: null },
    { libp2p: undefined }
  ]

  configs.forEach(c => t.notThrows(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})

test('should validate invalid libp2p', (t) => {
  const configs = [
    { libp2p: { modules: 138 } },
    { libp2p: 138 }
  ]

  configs.forEach(c => t.throws(() => Joi.attempt(c, Joi.ipfsConfig().required())))
})
