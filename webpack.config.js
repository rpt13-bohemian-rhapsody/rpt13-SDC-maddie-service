var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
var NODE_DIR = path.join(__dirname, '/node_modules');

module.exports = {
  entry: SRC_DIR + '/index.jsx',
  output: {
    filename: 'bundle.js',
    //publicPath: '/',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ],
  },
};
