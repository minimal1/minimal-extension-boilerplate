const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
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
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "static/index.html"),
      chunksSortMode: "none",
      chunks: ["main"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "static/*",
          filter: (filepath) => {
            return !filepath.includes("index.html");
          },
        },
      ],
    }),
  ],
};
