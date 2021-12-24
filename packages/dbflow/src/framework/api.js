import chalk from 'chalk';
import { failReturn, successReturn } from './msg';

export async function init(ctx, next) {
  const model = ctx.app.$model[ctx.params.list];
  if (model) {
    ctx.list = model;
    await next();
  } else {
    ctx.body = 'no this model';
  }
}

export async function list(ctx) {
  try {
    ctx.body = await ctx.list.find({});
  } catch (err) {
    console.log(chalk.red(err));
  }
}
export async function create(ctx) {
  try {
    // 以项目名为键
    const hasFind = await ctx.list.findOne({ projName: ctx.request.body.projName });
    if (!hasFind) {
      const res = await ctx.list.create(ctx.request.body);
      if (res) ctx.body = successReturn
      else ctx.body = failReturn('添加未成功');
    } else {
      ctx.body = failReturn('该项目已存在');
    }
  } catch (err) {
    ctx.body = failReturn('服务器失败');
    console.log(chalk.red(err));
  }
}
// export default {
//   async init(ctx, next) {
//     const model = ctx.app.$model[ctx.params.list];
//     console.log(model);
//     if (model) {
//       ctx.list = model;
//       await next();
//     } else {
//       ctx.body = 'no this model';
//     }
//   },

//   async list(ctx) {
//     ctx.body = await ctx.list.find({});
//   },
//   async get(ctx) {
//     ctx.body = await ctx.list.findOne({ _id: ctx.params.id });
//   },
//   async update(ctx) {
//     const res = await ctx.list.updateOne({ _id: ctx.params.id }, ctx.request.body);
//     ctx.body = res;
//   },
//   async del(ctx) {
//     const res = await ctx.list.deleteOne({ _id: ctx.params.id });
//     ctx.body = res;
//   },
//   async page(ctx) {
//     // console.log('page...', ctx.params.page);
//     ctx.body = await ctx.list.find({});
//   },
// };
