import path from 'path';
import chalk from 'chalk';
import Koa from 'koa';
import send from 'koa-send';
import router from 'koa-router';
const route = router();

import { startDeploy } from './deploy';
// const { startDeploy } = require('./deploy');
export function createServer() {
  const middlewares = new Koa();
  const server = {
    middlewares,
    listen(port = 3000) {
      this.middlewares.listen(port, () => {
        console.log(chalk.blue(`Server running http://localhost:${port}`));
      })
    }
  }
  // 根据请求路径得到相应文件
  const htmlPath = path.resolve(__dirname, '../../web/dist');
  middlewares.use(async (ctx, next) => {
    // ctx.path  // http://localhost:3000/src/main.js
    await send(ctx, ctx.path, { root: htmlPath, index: 'index.html' });
    await next();
  })
  middlewares.use(route.routes())
  route.post('/api/:list', async (ctx, next) => {
    console.log('123');
  });
  const production = {
    "user": "root",
    "host": "119.45.223.71",
    "ref": "origin/master",
    "repo": "git@gitee.com:torvals/pm2-demo.git",
    "path": "/home/deploy",
    "post-deploy": "npm install && npm run build"
  };
  const env = 'production';
  startDeploy(env, production, (err, data) => {
    if (err) {
      console.log(chalk.red('Deploy failed'));
      console.log(chalk.red(err.message || err));
      return;
    }
    console.log(chalk.green('--> Success'));
  });
  return server;
}

// // const chalk = require('chalk');
// const path = require('path');
// const Koa = require('koa');
// const send = require('koa-send');
// const router = require('koa-router')();
// // const { startDeploy } = require('./deploy');
// // const cors = require('koa2-cors');
// function createServer() {
//   const middlewares = new Koa();
//   const server = {
//     middlewares,
//     listen(port = 3000) {
//       this.middlewares.listen(port, () => {
//         console.log(`Server running http://localhost:${port}`);
//       })
//     }
//   }

//   // // 根据请求路径得到相应文件
//   // const htmlPath = path.resolve(__dirname, '../../web/dist');
//   // middlewares.use(async (ctx, next) => {
//   //   // ctx.path  // http://localhost:3000/src/main.js
//   //   await send(ctx, ctx.path, { root: htmlPath, index: 'index.html' });
//   //   await next();
//   // })
//   // const production = {
//   //   "user": "root",
//   //   "host": "119.45.223.71",
//   //   "ref": "origin/master",
//   //   "repo": "git@gitee.com:torvals/pm2-demo.git",
//   //   "path": "/home/deploy",
//   //   "post-deploy": "npm install && npm run build"
//   // };
//   // startDeploy(production, (err, data) => {
//   //   if (err) {
//   //     console.log('Deploy failed');
//   //     console.log(err.message || err);
//   //     return;
//   //   }
//   //   Common.printOut('--> Success');
//   // });

//   return server;
// }

// module.exports = {
//   createServer
// }