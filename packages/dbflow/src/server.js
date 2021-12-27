import chalk from 'chalk';
import Koa from 'koa';
import send from 'koa-static';
import config from './config/config';
import loadModel from './framework/loader';
const bodyParser = require('koa-bodyparser');
import restful from './framework/router';
const cors = require('koa2-cors');
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
  app.use(
    cors({
      origin: function (ctx) {
        //设置允许来自指定域名请求
        if (ctx.url === '/test') {
          return '*'; // 允许来自所有域名请求
        }
        return 'http://localhost:3000'; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
    }),
  );
  app.use(bodyParser());
  app.use(send(config.htmlPath));
  app.use(restful);

}