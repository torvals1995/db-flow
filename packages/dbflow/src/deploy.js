import tv4 from 'tv4';
import chalk from 'chalk';
import { castArray } from './utils/index';
import spawn from './utils/spawn';
// import { cloneDeep as esCloneDeep } from 'lodash-es';
const schema = {
  type: 'object',
  properties: {
    // 环境变量
    env: { type: 'string' },
    // 项目名，新建
    projName: { type: 'string' },
    // 项目描述，新建、可选
    projDesc: { type: 'string', },
    // 部署ip地址，新建
    host: { type: ['string', 'array'] },
    // 代码仓库，新建
    codeRepo: { type: 'string' },
    // 代码分支，执行部署的时候使用
    ref: { type: 'string' },
    // 部署目录，新建
    path: { type: 'string' },
    // 部署指令，新建
    deployOrder: { type: 'string' },
  },
  required: ['env', 'host', 'codeRepo', 'path', 'ref', 'deployOrder'],
};

export function startDeploy(envConfig) {
  const result = tv4.validateResult(envConfig, schema);
  envConfig.user = "root";
  if (!result.valid) {
    console.log(chalk.red('Deploy failed'));
    console.log(chalk.red(result.error));
    return;
  } else {
    console.log(chalk.green('Deploy format validate'));
  }
  process.env.NODE_ENV = "production"
  if (process.env.NODE_ENV !== 'test') {
    console.log(chalk.yellow(`--> Deploying to ${envConfig.env} environment`));
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