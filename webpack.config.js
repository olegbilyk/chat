const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const develop = process.env.NODE_ENV !== 'production'

module.exports = {
  context: path.resolve(__dirname, './components'),

  entry: {
    app: './app.js'
  },

  output: {
    // path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  devtool: develop ? 'cheap-module-source-map' : false,

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
      disable: develop
    })
  ]
}
