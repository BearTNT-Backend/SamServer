const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  devtool: '#eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  // plugins: [
  //   new webpack.SourceMapDevToolPlugin({
  //     module: true
  //   })
  // ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            loader: 'source-map-loader'
          }
        ]
      },
      {
        test: /\.css$/i,
        loader: ['style-loader', 'css-loader']
      }
    ],
  }
};

