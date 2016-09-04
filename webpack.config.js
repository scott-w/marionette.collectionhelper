const path = require('path');

module.exports = {
  entry: './src/index.js',
  externals: {
    jquery: {
      global: '$',
      commonjs: 'jquery'
    },
    backbone: true,
    underscore: true
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
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'marionette.collectionhelper.js',
    library: 'marionette.collectionhelper',
    libraryTarget: 'commonjs2'
  }
};
