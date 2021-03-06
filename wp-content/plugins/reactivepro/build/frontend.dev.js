/* eslint-disable */
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const notify = require('webpack-notifier');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ReWebpackPlugin = require('./plugin');
const paths = require('./paths');
const commonConfig = require('./base');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractFrontCss = new ExtractTextPlugin('../css/reactive-front.css');
const ExtractFrontLess = new ExtractTextPlugin('../css/reactive-front-two.css');

const fileNames = ['base', 'preview'];
const entries = {};

fileNames.forEach((fileName) => {
  entries[`re_${fileName}`] =  `${paths.appSrc}/frontend/base/${fileName}.js`;
});

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    devtool: 'eval-source-map',
    name: 'reactive',
    entry: entries,
    output: {
      path: paths.appDest,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
    module: {
      rules:[
        {
          test: /\.css$/,
          use: ExtractFrontCss.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
        },
        {
          test: /\.less$/,
          use: ExtractFrontLess.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
              'less-loader?outputStyle=expanded&sourceMap',
            ]
          }),
        },
      ],
    },
    plugins: [
      ExtractFrontCss,
      ExtractFrontLess,
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify('dev')
      }),
      new ReWebpackPlugin(),
      new CaseSensitivePathsPlugin(),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new AssetsPlugin({ fullPath: false, prettyPrint: true, filename: './resource/frontend-assets.json'}),
      new notify({ title: 'Webpack', sound: 'Glass' }),
    ]
  });
}
