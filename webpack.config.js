const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jpeg|jpg|png|gif|svg|webp|ttf|woff2)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.js|json$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ITERM',
      filename: 'remoteEntry.js',
      exposes: {
        './Iterm': './src/Iterm.js',
      },
      shared: [{ react: { singleton: true } }],
    }),
    new CopyWebpackPlugin({
      patterns: [
        'src/public/_redirects',
      ],
    }),
    new MiniCssExtractPlugin({
      chunkFilename: 'styles.css',
    }),
    new HtmlWebPackPlugin({
      title: 'Harish Kumar',
      template: 'src/public/index.html',
    }),
  ],
  devServer: {
    port: 1236,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/Components'),
    },
    extensions: ['', '.js'],
  },
};
