// node core modules
const webpack = require('webpack')
const path = require('path')
const packageJSON = require('./package.json')

// dev-dependencies
const svgToMiniDataURI = require('mini-svg-data-uri')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin') // provided out of the box in webpack 5
const CopyPlugin = require('copy-webpack-plugin')

// paths
const resolvePath = relPath => path.resolve(__dirname, relPath)
const paths = {
  appSrc: resolvePath('frontend/src'),
  appPublic: resolvePath('frontend/public'),
  appDist: resolvePath('dist'),
  appSass: resolvePath('frontend/src/scss'),
  appAssets: resolvePath('frontend/src/assets')
}

// alias definition
const aliasDefs = {
  '@scss': paths.appSass,
  '@images': path.join(paths.appAssets, 'images'),
  '@components':  path.join(paths.appSrc, 'js/components'),
  '@hooks':  path.join(paths.appSrc, 'js/hooks'),
  '@frontend-utils': path.join(paths.appSrc, 'js/utils'),
  '@utilities': path.join(paths.appSrc, 'js/utils/utilities.js'),
  '@redux-api': path.join(paths.appSrc, 'js/utils/redux-toolkit-reexport.js'),
  '@pages': path.join(paths.appSrc, 'js/pages'),
  '@store': path.join(paths.appSrc, 'js/store'),
  '@store-slice': path.join(paths.appSrc, 'js/store/features')
}

// regExps
const fontRegex = /\.(woff(2)?|ttf|eot)$/
const imageRegex = [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]
const svgRegex = /\.svg$/
const rawAssetRegex = [/\.txt$/]
const jsRegex = /\.js$/
const mjsRegex = /\.mjs$/
const scssRegex = /\.scss$/

module.exports = (envSettings) => {
  const { mode } = envSettings
  const isProd = mode === 'production'
  const isDev = mode === 'development'
  
  const config = {
    entry: './frontend/src/index.js',
    output: {
      filename: isProd ? 'static/js/[name].[contenthash:8].js' :
        isDev ? 'static/js/[name].bundle.js' : '',
      path: paths.appDist,
      publicPath: isDev ? '/' : ''
    },
    mode: mode || 'none',
    module: {
      rules: [
        {
          oneOf: [
            {
              test: fontRegex,
              type: 'asset/resource',
              generator: {
                filename: 'static/fonts/[hash][ext]'
              }
            },
            {
              // emit all images to output directory as static assets
              test: imageRegex,
              type: 'asset/resource',
              generator: {
                filename: 'images/[hash][ext]'
              }
            },
            {
              // if bigger than 8kb, emit it as a static asset,
              // otherwise inline the asset as dataURL.
              test: svgRegex,
              type: 'asset',
              generator: {
                dataUrl: content => {
                  content = content.toString()
    
                  // optimize the generated svg dataURI
                  return svgToMiniDataURI(content)
                }
              },
              parser: {
                dataUrlCondition: {
                  maxSize: 8 * 1024 // 8kb
                }
              }
            },
            {
              // anything that needs to be read as a raw data
              test: rawAssetRegex,
              type: 'asset/source'
            },
            {
              test: mjsRegex,
              include: /node_modules/,
              type: 'javascript/esm'
            },
            {
              test: jsRegex,
              exclude: /node_modules/,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    presets: [
                      '@babel/preset-env',
                      '@babel/preset-react'
                    ],
                    plugins: [
                      '@babel/plugin-proposal-class-properties',
                      '@babel/plugin-syntax-dynamic-import',
                      '@babel/plugin-transform-runtime'
                    ],
                    compact: isProd
                  }
                }
              ]
            },
            {
              test: scssRegex,
              use: [
                { loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: Object.assign({}, 
                    isProd && {
                      publicPath: '../../'
                    })
                },
                { loader: require.resolve('css-loader') },
                {
                  loader: require.resolve('resolve-url-loader'),
                  options: {
                    sourceMap: isDev,
                    root: paths.appSrc,
                  },
                },
                {
                  loader: require.resolve('sass-loader'),
                  options: {
                    implementation: require('sass'),
                    sassOptions: {
                      includePaths: [ paths.appSass ]
                    },
                    additionalData: "@import 'variables';"
                  }
                }
              ]
            },
            // if none of the rules above matches, it will fall back to this rule
            {
              type: 'asset/resource',
              exclude: [ /\.js$/, /\.html$/, /\.json$/],
              generator: {
                filename: 'static/media/[hash][ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(), // empty the /dist folder on each build
      new HtmlWebpackPlugin({
        template: './frontend/public/index.html',
        filename: 'index.html',
        minify: isProd
      }),
      isProd && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'frontend/public/images', to: 'images' }
        ]
      }),
      new webpack.DefinePlugin({
        APP_MODE: JSON.stringify(mode)
      })
    ].filter(Boolean),
    resolve: {
      alias: aliasDefs,
      extensions: ['.js', '.json'], // extensions to be used to resolve when a module is referenced without the extension specified
      mainFiles: ['index'] // the file name to be used when resolving a folder
    },
    devtool: isProd ? 'cheap-module-source-map' : // in case we want devtool investigation in PROD app as well
      isDev ? 'inline-source-map' :
      'none',
    optimization: {
      minimize: isProd,
      minimizer: [
        isProd && new TerserWebpackPlugin()
      ].filter(Boolean),
      splitChunks: {
        chunks: 'all'
      }
    }
  }

  if (isDev) {
    Object.assign(
      config,
      {
        devServer: {
          hot: true,
          compress: true,
          client: {
            overlay: true
          },
          static: {
            directory: paths.appDist
          },
          port: 3030,
          historyApiFallback: true,
          proxy: {
            '/api': { // if this setting changes, the axios instance config in api-requests.js has to be updated too.
              target: packageJSON.proxy,
              pathRewrite: {
                '^/api': ''
              }
            }
          }
        }
      }
    )
  }

  return config
}