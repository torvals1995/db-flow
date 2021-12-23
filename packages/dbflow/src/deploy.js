const tv4 = require('tv4');
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

function startDeploy(options, cb) {
  const result = tv4.validateResult(envConfig, schema);
  if (!result.valid) {
    return cb(result.error);
  } else {
    console.log('没问题');
  }
}

module.exports = {
  startDeploy
}