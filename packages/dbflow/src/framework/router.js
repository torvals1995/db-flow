
const Router = require('koa-router');
const router = new Router();
import { startDeploy } from '../deploy';
import {
  init,
  create,
  list,
  get,
  update,
  del,
} from './api';


// /api/user/ get方法
router
  .post('/api/:list', init, create)
  .get('/api/:list', init, list)
  .get('/api/:list/:id', init, get)
  .put('/api/:list/:id', init, update)
  .delete('/api/:list/:id', init, del)

router
  .post("/action/deploy", async (ctx) => {
    // ctx.body = '123456';
    const envOptions = ctx.request.body;
    ctx.body = '123456';
    startDeploy(envOptions);
    // const env = 'production';
    // startDeploy(env, production, (err, data) => {
    //   if (err) {
    //     console.log(chalk.red('Deploy failed'));
    //     console.log(chalk.red(err.message || err));
    //     return;
    //   }
    //   console.log(chalk.green('--> Success'));
    // });
    // return server;
  })
export default router.routes();
