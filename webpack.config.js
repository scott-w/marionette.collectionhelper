const path = require('path');

module.exports = {
  entry: './src/index.js',
  externals: {
    jquery: {
      global: '$',
      commonjs: 'jquery'
    },
    backbone: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.test\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'marionette.collectionhelper.js'
  }
};
