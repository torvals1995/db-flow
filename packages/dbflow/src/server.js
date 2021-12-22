const path = require('path');
const Koa = require('koa');
const send = require('koa-send');
function createServer() {
  const middlewares = new Koa();
  const server = {
    middlewares,
    listen(port = 3000) {
      this.middlewares.listen(port, () => {
        console.log(`Server running http://localhost:${port}`);
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
  
  return server;
}

module.exports = {
  createServer
}