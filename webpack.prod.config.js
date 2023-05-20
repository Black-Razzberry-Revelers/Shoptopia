const { merge } = require('webpack-merge');
const MiniCssExtract = require('mini-css-extract-plugin');
const MiniCSS = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common.config');

module.exports = merge(
  common,
  {
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /.s?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [new MiniCssExtractPlugin()],
  },
);
