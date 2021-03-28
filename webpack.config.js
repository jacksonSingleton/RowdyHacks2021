const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new CopyPlugin({
      patterns: [{
        from: 'src/assets',
        to: 'assets'
      }, ]
    })
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [{
        loader: 'babel-loader',
        test: /\.js|\.jsx$/,
        exclude: /node_modules/
      },
      {
          use: ["style-loader", "css-loader"],
          test: /\.css$/
      }
    ]
  }
};
