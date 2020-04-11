const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "public/src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/src/index.html",
      filename: "./index.html"
    })
  ]
};
