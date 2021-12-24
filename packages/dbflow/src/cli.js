import cac from 'cac';
const cli = cac('dbflow')

// deploy
cli
  .command('[root]') // default command
  .alias('deploy')
  .option('--port <port>', `[number] specify port`)
  .action(async (root, options) => {
    const { createServer } = await import('./server')

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
