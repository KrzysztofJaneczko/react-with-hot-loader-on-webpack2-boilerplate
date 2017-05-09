const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

/*
 * I like having both development and production settings in one place,
 * so I distinguish them using the isDevServer const and a bunch of inline ifs.
 */
const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'))

const entryDev = [
  'react-hot-loader/patch',
  './src/'
]
const entryProd = [
  './src/'
]

const pluginsDev = [
  new webpack.HotModuleReplacementPlugin()
]
const pluginsProd = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
]

module.exports = {
  entry: isDevServer ? entryDev : entryProd,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: isDevServer ? pluginsDev : pluginsProd,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2017']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
}
