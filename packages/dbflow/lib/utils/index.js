const path = require('path');
const child_process = require('child_process');
const format = require('util').format;
const Utils = {
  // 
  isConfigFile(filename) {
    if (typeof (filename) !== 'string')
      return null;
    if (filename.indexOf('.json') !== -1)
      return 'json';
    if (filename.indexOf('.yml') > -1 || filename.indexOf('.yaml') > -1)
      return 'yaml';
    if (filename.indexOf('.config.js') !== -1)
      return 'js';
    if (filename.indexOf('.config.cjs') !== -1)
      return 'js';
    if (filename.indexOf('.config.mjs') !== -1)
      return 'mjs';
    return null;
  },
  parseConfig(confObj, filename) {
    // console.log('confObj: ', confObj);
    // console.log('filename: ', filename);
    // var yamljs = require('yamljs');
    const vm = require('vm');

    if (!filename ||
      filename == 'pipe' ||
      filename == 'none' ||
      filename.indexOf('.json') > -1) {
      // 将buffer转成string
      const code = '(' + confObj + ')';
      const sandbox = {};

      return vm.runInThisContext(code, sandbox, {
        filename: path.resolve(filename),
        displayErrors: false,
        timeout: 1000
      });
    }
    // else if (filename.indexOf('.yml') > -1 ||
    //   filename.indexOf('.yaml') > -1) {
    //   return yamljs.parse(confObj.toString());
    // }
    // else if (filename.indexOf('.config.js') > -1 || filename.indexOf('.config.cjs') > -1 || filename.indexOf('.config.mjs') > -1) {
    //   var confPath = require.resolve(path.resolve(filename));
    //   delete require.cache[confPath];
    //   return require(confPath);
    // }
  },

  printError(msg) {
    if (process.env.PM2_SILENT || process.env.PM2_PROGRAMMATIC === 'true') return false;
    if (msg instanceof Error)
      return console.error(msg.message);
    return console.error.apply(console, arguments);
  },
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  castArray(arg) {
    return Array.isArray(arg) ? arg : [arg];
  },
  prependEnv(cmd, env) {
    const envVars = this.envToString(env);
    console.log('env: ', env);
    console.log('envVars: ', envVars);
    if (!envVars) return cmd;
    if (!cmd) return format('export %s', envVars);
    return format('export %s && %s', envVars, cmd);
  },
  envToString(env) {
    env = env || {};
    return Object.keys(env).map(function (name) {
      return format('%s=%s', name.toUpperCase(), env[name]);
    }).join(' ');
  },
  spawn(config, args, cb) {
    var cmd = format('echo \'%j\' | "%s"', config, require.resolve('../deploy'));
    args = args || [];
    if (args.length > 0) {
      var cmdArgs = args.map(function (arg) {
        return format('"%s"', arg);
      }).join(' ');
      cmd = [cmd, cmdArgs].join(' ');
    }
    console.log('cmd: ', cmd);
    var proc = child_process.spawn('sh', ['-c', cmd], { stdio: 'inherit' });
    // var error;

    // proc.on('error', function (err) {
    //   error = err;
    // });

    // proc.on('close', function (code) {
    //   if (code === 0) return cb(null, args);
    //   error = error || new Error(format('Deploy failed with exit code: %s', code));
    //   error.code = code;
    //   return cb(error);
    // });
  }
}

module.exports = Utils;