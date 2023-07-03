const path = require('path');
const { NODE_ENV = 'production' } = process.env;
module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' }],
  },
};
