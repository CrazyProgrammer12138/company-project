'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"//testtxapi.hulian120.com"'
  API_ROOT: '"//192.168.1.54:9700"'
})
