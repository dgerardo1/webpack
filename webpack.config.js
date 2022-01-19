const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: {
    js: "./src/index.js",
    react: "./src/index_react.js",
    ts: "./src/index_ts.js",
  },
  output: {
    filename: "[name].[chunkhash].js",
    assetModuleFilename: "assets/[name].[ext]",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        use: [
            {
            loader: "html-loader",
            options: { minimize: true },
            },
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg|webp)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: false,
      //         fallback: 'file-loader',
      //         name: '[name].[ext]',
      //         publicPath: '/assets/',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/i,
        // use: [MiniCssExtractPlugin.loader, "css-loader"],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: "asset/resource",
        use:["image-webpack-loader"]
        // use: ["file-loader?name=assets/[name].[ext]"],
      },
      {
        test: /\.(woff)$/i,
        type: "asset/resource",
        // use: ["file-loader?name=assets/[name].[ext]"],
      },
    ],
  },
  plugins: [
      /* new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
      }), */
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        chunks: ["js"],
        hash: true,
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./react.html",
        chunks: ["react"],
        hash: true,
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./ts.html",
        chunks: ["ts"],
        hash: true,
      }),
      new MiniCssExtractPlugin({
        runtime: false,
      }),
  ],
  // optimization: {
  //   minimizer: [
  //     "...",
  //     new ImageMinimizerPlugin({
  //       minimizer: {
  //         implementation: ImageMinimizerPlugin.squooshMinify,
  //         options: {
  //           // Your options for `squoosh`
  //           encodeOptions: {
  //             mozjpeg: {
  //               quality: 90
  //             },
  //             optipng: {
  //               optimizationLevel: 3
  //             },
  //           },
  //         },
  //       },
  //     }),
  //   ],
  // },
};