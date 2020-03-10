const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.css$/,
        use: [
          //
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          //
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "../", "src")],
    alias: {
      src: path.resolve(__dirname, "../", "src"),
      "@views": path.resolve(__dirname, "../", "src/views"),
      "@state": path.resolve(__dirname, "../", "src/state"),
      "@constants": path.resolve(__dirname, "../", "src/constants"),
      "@layouts": path.resolve(__dirname, "../", "src/layouts"),
      "@utils": path.resolve(__dirname, "../", "src/utils")
    },
    extensions: ["*", ".js", ".jsx", ".json"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Steam Trade Pricing",
      template: "./src/index.html",
      favicon: "./src/favicon.ico",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      }
    }),
    new CopyWebpackPlugin([{ from: "./src/manifest.json" }]),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV === "development"
          ? "styles/[name].css"
          : "styles/[name].[hash].css",
      chunkFilename:
        process.env.NODE_ENV === "development"
          ? "styles/[id].css"
          : "styles/[id].[hash].css"
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    publicPath: "/",
    filename: "[name].[hash].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Split vendor code to its own chunk(s)
        vendors: {
          test: /[\\/]node_modules[\\/]/i,
          chunks: "all"
        },
        // Split code common to all chunks to its own chunk
        commons: {
          name: "commons", // The name of the chunk containing all common code
          chunks: "initial", // TODO: Document
          minChunks: 2 // This is the number of modules
        }
      }
    },
    // The runtime should be in its own chunk
    runtimeChunk: {
      name: "runtime"
    }
  }
};
