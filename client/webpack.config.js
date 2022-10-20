/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "/dist"), filename: "index.js" },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.html$/, loader: "html-loader" },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
