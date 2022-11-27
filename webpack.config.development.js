const path = require("path");
const baseConfig = require("./webpack.config.base");

const DEV_PORT = 4001;

module.exports = {
  ...baseConfig,
  mode: "development",
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
};
