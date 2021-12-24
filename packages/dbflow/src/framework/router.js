
const Router = require('koa-router');
const router = new Router();
import { startDeploy } from '../deploy';
import { list, init, create } from './api';
// , get, create, update, del


// /api/user/ get方法
router
  .get('/api/:list', init, list)
  .post('/api/:list', init, create)
// router.get('/api/:list/:id', init, get);
// router.put('/api/:list/:id', init, update);
// router.delete('/api/:list/:id', init, del);

router
  .post("/api/deploy", async (ctx) => {
    // todo：用tv4校验
    
    // startDeploy();
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
