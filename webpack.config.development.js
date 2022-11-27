const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const DEV_PORT = 4001;

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.tsx",
    content: "./content/index.ts",
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === "main" ? "[name].js" : "content/[name].js";
    },
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: DEV_PORT,
    devMiddleware: {
      publicPath: "/",
    },
    hot: true,
    liveReload: false,
    static: {
      directory: path.join(__dirname, "../"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "static/index.html"),
      chunksSortMode: "none",
      publicPath: "/",
      chunks: ["main"],
    }),
  ],
};
