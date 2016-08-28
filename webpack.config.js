const path = require('path');

module.exports = {
  entry: './src/collections.js',
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
    filename: 'marionette.collectionhelper.js'
  },
  resolve: {
    modulesDirectories: [path.join(__dirname, 'node_modules')],
    root: path.join(__dirname, 'src')
  }
};
