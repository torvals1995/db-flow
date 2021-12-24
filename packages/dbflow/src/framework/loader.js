import chalk from 'chalk';
import { readdir } from 'fs/promises';
const path = require('path');
const mongoose = require('mongoose');
import config from '../config/config';

// 优化：两个try...catch
async function load(dir, cb) {
  const url = path.resolve(__dirname, dir);
  let files;
  try {
    files = await readdir(url);
  } catch (err) {
    console.error(err);
  }
  files.forEach(async (filename) => {
    filename = filename.replace('.js', '');
    let file;
    try {
      file = await import(url + '/' + filename)
    } catch (err) {
      console.error(err);
    }
    // 处理
    cb(filename, file);
  });
}

export default function loadModel(app) {
  mongoose.connect(config.db.url, config.db.options);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log(chalk.green('db connected!'));
  });
  app.$model = {};
  load('../model', (filename, { schema }) => {
    app.$model[filename] = mongoose.model(filename, schema);
  });
}

// module.exports = {
//   loadModel,
// };