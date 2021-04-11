const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'development',

  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  // если нужна карта при разработке, либо '' если не нужно

  // Точка входа
  context: path.resolve(__dirname, 'src'),
  entry: {
    // main: ['@babel/polyfill', './index.js'],
    main: './index.js',
    analytics: './analytics.ts',
  },

  // Точка выхода
  output: {
    // filename: '[name].[contenthash].js',
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build'),
  },

  resolve: {
    extensions: ['.js', '.json', 'css', 'sass', 'scss'],
    // расширения по умолчанию для webpack
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@': path.resolve(__dirname, 'src'),
    },
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },

  devtool: 'eval-source-map',

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // template: path.resolve(__dirname, 'src/index.html'), // шаблон
      // filename: 'index.html', // название выходного файла
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      // filename: '[name].[contenthash].css',
      filename: 'style.min.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/*.png'),
          to: path.resolve(__dirname, './build'),
        },
      ],
    }),
    // new webpack.SourceMapDevToolPlugin({}),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      // JavaScript
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
          'eslint-loader',
        ],
      },
      // TypeScript
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
          'eslint-loader',
        ],
      },
      // JSX
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
          'eslint-loader',
        ],
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // CSS, PostCSS, Sass
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
}
