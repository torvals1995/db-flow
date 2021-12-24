import chalk from 'chalk';
import Koa from 'koa';
import send from 'koa-static';
import config from './config/config';
import loadModel from './framework/loader';
const bodyParser = require('koa-bodyparser');
import restful from './framework/router';
export function createServer() {
  const app = new Koa();
  loadModel(app);
  addPlugin(app);
  const server = {
    app,
    listen(port = 3000) {
      this.app.listen(port, () => {
        console.log(chalk.blue(`Server running http://localhost:${port}`));
      })
    }
  }
  return server;

}

function addPlugin(app) {
  app.use(bodyParser());
  app.use(send(config.htmlPath));
  app.use(restful);
}