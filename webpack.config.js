const path = require('path');

module.exports = {
  entry: './react-app/src/index.js',
  output: {
    path: path.resolve(__dirname, 'bin/web/public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'react-app'), 'node_modules'], // <-- add path to src folder
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
};