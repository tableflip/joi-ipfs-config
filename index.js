module.exports = (Joi) => {
  Joi = Joi.extend(require('joi-multiaddr'))

  const schema = Joi.object().keys({
    repo: Joi.alternatives().try(
      Joi.object(), // TODO: schema for IPFS repo
      Joi.string() // path
    ).allow(null),
    init: Joi.alternatives().try(
      Joi.boolean(),
      Joi.object().keys({ bits: Joi.number().integer() })
    ).allow(null),
    start: Joi.boolean(),
    pass: Joi.string().allow(''),
    EXPERIMENTAL: Joi.object().keys({
      pubsub: Joi.boolean(),
      sharding: Joi.boolean(),
      dht: Joi.boolean()
    }).allow(null),
    config: Joi.object().keys({
      Addresses: Joi.object().keys({
        Swarm: Joi.array().items(Joi.multiaddr()),
        API: Joi.multiaddr(),
        Gateway: Joi.multiaddr()
      }).allow(null),
      Discovery: Joi.object().keys({
        MDNS: Joi.object().keys({
          Enabled: Joi.boolean(),
          Interval: Joi.number().integer()
        }).allow(null),
        webRTCStar: Joi.object().keys({
          Enabled: Joi.boolean()
        }).allow(null)
      }).allow(null),
      Bootstrap: Joi.array().items(Joi.multiaddr().IPFS())
    }).allow(null),
    libp2p: Joi.object().keys({
      // TODO: schemas for libp2p modules?
      modules: Joi.object().allow(null)
    }).allow(null)
  }).options({ allowUnknown: true })

  return { name: 'ipfsConfig', base: schema }
}
