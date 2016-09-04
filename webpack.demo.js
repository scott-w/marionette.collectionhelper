const path = require('path');

module.exports = {
  entry: './demo/app/driver.js',
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
    path: path.join(__dirname, 'demo/js'),
    filename: 'app.js'
  }
};
