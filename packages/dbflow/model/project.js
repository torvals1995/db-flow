module.exports = {
  schema: {
    // 项目名
    projName: { type: String, required: true },
    // 项目描述
    projDesc: { type: String },
    // ip地址
    host: { type: String, required: true },
    // 存储路径
    path: { type: String, required: true },
    // 部署指令
    deployOrder: { type: String, required: true },
    // 代码仓库
    codeRepo: { type: String, required: true },
  },
};
