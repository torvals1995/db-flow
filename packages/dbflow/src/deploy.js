import tv4 from 'tv4';
import chalk from 'chalk';
import { castArray } from './utils/index';
import spawn from './utils/spawn';
// import { cloneDeep as esCloneDeep } from 'lodash-es';
const schema = {
  type: 'object',
  properties: {
    // 项目名，新建
    projName: { type: 'string' },
    // 项目描述，新建、可选
    projDesc: { type: 'string', },
    // 部署ip地址，新建
    host: { type: ['string', 'array'] },
    // 代码仓库，新建
    repo: { type: 'string' },
    // 代码分支，执行部署的时候使用
    ref: { type: 'string' },
    // 部署目录，新建
    path: { type: 'string' },
    // 部署指令，新建
    'post-deploy': { type: 'string' },
    // 用户：使用插件来支持
    // user: { type: 'string', minLength: 1 },
  },
  required: ['host', 'repo', 'path', 'ref'],
};

export function startDeploy(env, envConfig, cb) {
  const result = tv4.validateResult(envConfig, schema);
  if (!result.valid) {
    return cb(result.error);
  } else {
    console.log(chalk.green('结构没问题'));
  }
  process.env.NODE_ENV = "production"
  if (process.env.NODE_ENV !== 'test') {
    console.log(chalk.yellow(`--> Deploying to ${env} environment`));
  }
  // const hosts = castArray(envConfig.host);
  spawn(envConfig)
  // const jobs = hosts.map(function (host) {
  //   return function job(done) {
  //     if (process.env.NODE_ENV !== 'test') {
  //       console.log('--> on host %s', host.host ? host.host : host);
  //     }
  //     const config = esCloneDeep(envConfig);
  //     config.host = host;
  //     console.log('config: ', config);
  //     // Utils.spawn(config, args, done);
  //   };
  // });
  // series(jobs, function (err, result) {

  //   // result = Array.isArray(envConfig.host) ? result : result[0];
  //   // cb(err, result);
  // });
}