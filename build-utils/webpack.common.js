const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // only use the mode of development
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
      src: path.resolve(__dirname, "../", "src")
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
    new CopyWebpackPlugin([{ from: "./src/manifest.json", to: "" }]),
    new MiniCssExtractPlugin({
      filename: "./styles/index.css"
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    publicPath: "/",
    filename: "bundle.js"
  }
};
