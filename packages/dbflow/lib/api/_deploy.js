const path = require('path');

const Utils = require('../utils');
const format = require('util').format;
const tv4 = require('tv4');
const series = require('run-series');

const schema = {
  type: 'object',
  properties: {
    user: { type: 'string', minLength: 1 },
    host: { type: ['string', 'array'] },
    repo: { type: 'string' },
    path: { type: 'string' },
    ref: { type: 'string' },
    fetch: { type: 'string' },
  },
  required: ['host', 'repo', 'path', 'ref'],
};

function deployForEnv(deployConfig, env, args, cb) {
  if (!deployConfig[env]) {
    return cb(new Error(format('%s not defined in deploy section', env)));
  }

  const envConfig = Utils.clone(deployConfig[env]);

  // if (envConfig.ssh_options) {
  //   envConfig.ssh_options = castArray(envConfig.ssh_options).map(function (option) {
  //     return format('-o %s', option);
  //   }).join(' ');
  // }

  const result = tv4.validateResult(envConfig, schema);
  if (!result.valid) {
    return cb(result.error);
  }
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'test') {
    console.log('--> Deploying to %s environment', env);
  }

  if (process.platform !== 'win32') {
    envConfig.path = path.resolve(envConfig.path);
  }

  const hosts = Utils.castArray(envConfig.host);
  const jobs = hosts.map(function (host) {
    return function job(done) {
      if (process.env.NODE_ENV !== 'test') {
        console.log('--> on host %s', host.host ? host.host : host);
      }

      const config = Utils.clone(envConfig);
      config.host = host;
      config['post-deploy'] = Utils.prependEnv(config['post-deploy'], config.env);
      console.log('config: ', config);
      Utils.spawn(config, args, done);
    };
  });
  series(jobs, function (err, result) {
    result = Array.isArray(envConfig.host) ? result : result[0];
    cb(err, result);
  });

  return false;
}


module.exports = {
  deployForEnv: deployForEnv,
};