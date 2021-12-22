const cac = require('cac');
const cli = cac('dbflow')

// deploy
cli
  .command('[root]') // default command
  .alias('deploy')
  .option('--port <port>', `[number] specify port`)
  .action((root, options) => {
    const { createServer } = require('./server');

    try {
      const server = createServer();
      server.listen(3001);
    } catch (e) {
      createLogger(options.logLevel).error(
        chalk.red(`error when starting dev server:\n${e.stack}`),
        { error: e }
      )
      process.exit(1)
      
    };
  });

cli.parse();
