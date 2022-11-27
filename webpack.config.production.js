const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = require("./webpack.config.base");

module.exports = {
  ...baseConfig,
  mode: "production",
  plugins: [
    ...baseConfig.plugins,
    new CopyPlugin({
      patterns: [
        {
          from: "static/*",
          to: "[name][ext]",
          filter: (filepath) => {
            return !filepath.includes("index.html");
          },
        },
      ],
    }),
  ],
};
