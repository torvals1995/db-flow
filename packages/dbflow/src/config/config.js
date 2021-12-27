import path from 'path';
export default {
  // htmlPath: path.resolve(__dirname, '../../web/dist'),
  htmlPath: path.resolve(__dirname, '..'),
  db: {
    url: 'mongodb://localhost:27017',
    options: { useNewUrlParser: true },
  },
}