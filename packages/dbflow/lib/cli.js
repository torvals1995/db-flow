// console.log('kaishi')

const commander = require('commander');
const PM2 = require('./API');

var pm2 = new PM2();
commander.version('0.0.4');




commander
  .command('deploy <file|environment>')
  .description('deploy your json')
  .action(function (cmd) {
    pm2.deploy(cmd, commander);
  });

// 处理参数
commander.parse(process.argv);