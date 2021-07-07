/* Base config:
  ========================================================================== */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isDev = process.env.NODE_ENV !== 'production';

// Main const
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './public/static'),
  assets: 'assets/'
}
const buildConfig = {
  mode: 'production'
};

const devConfig = {
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, './public/static'),
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

const baseWebpackConfig = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].[contenthash].js`,
    path: PATHS.dist,
    publicPath: isDev ? '/' : './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader,},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ],
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.js'
    }
  },
  plugins: [
    // Vue loader
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`
    }),
    // for images not embedded in CSS
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/${PATHS.assets}img`,
          to: `${PATHS.assets}img`
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: `./index.html`
    })
  ]
};

const { merge } = require('webpack-merge');

module.exports = merge(isDev ? devConfig : buildConfig, baseWebpackConfig);
