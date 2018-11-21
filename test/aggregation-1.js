const redisOptions = {
    port: 6379,
    // host: 'redis'
    host: '192.168.99.100'
},
redis     = require('redis'),
client    = redis.createClient(redisOptions.port, redisOptions.host),
nachlass = require('../');

nachlass.setClient(client);