const fs = require('fs');
const Utils = require('../utils');
module.exports = function (CLI) {
  CLI.prototype.deploy = function (file, commands, cb) {
    const that = this;

    // deploy的后面参数
    let args = commands.rawArgs;
    args.splice(0, args.indexOf('deploy') + 1);
    console.log('args: ', args);
    if (!Utils.isConfigFile(file)) {
      env = args[0];
    } else env = args[1];
    let json_conf = null;
    try {
      json_conf = Utils.parseConfig(fs.readFileSync(file), file);
    } catch (e) {
      Utils.printError(e);
      return cb ? cb(e) : that.exitCli(cst.ERROR_EXIT);
    }

    // if (!env) {
    //   deployHelper();
    //   return cb ? cb() : that.exitCli(cst.SUCCESS_EXIT);
    // }

    if (!json_conf.deploy || !json_conf.deploy[env]) {
      Utils.printError('%s environment is not defined in %s file', env, file);
      return cb ? cb('%s environment is not defined in %s file') : that.exitCli(cst.ERROR_EXIT);
    }

    if (!json_conf.deploy[env]['post-deploy']) {
      json_conf.deploy[env]['post-deploy'] = 'pm2 startOrRestart ' + file + ' --env ' + env;
    }

    require('./_deploy').deployForEnv(json_conf.deploy, env, args, function(err, data) {
      // if (err) {
      //   Common.printError('Deploy failed');
      //   Common.printError(err.message || err);
      //   return cb ? cb(err) : that.exitCli(cst.ERROR_EXIT);
      // }
      // Common.printOut('--> Success');
      // return cb ? cb(null, data) : that.exitCli(cst.SUCCESS_EXIT);
    });
  }
}