const { merge } = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const devConfig = {
  mode: "development",
  // target: "web",
  output: {
    publicPath: "http://localhost:3030/",
  },
  // optimization: {
  //   minimize: false,
  // },
  devtool: "source-map",
  devServer: {
    port: 3030,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new MFLiveReloadPlugin({
    //   port: 3004,
    //   container: "sfservice",
    //   standalone: true,
    // }),
    new ModuleFederationPlugin({
      name: "personal_test",
      filename: "remoteEntry.js",
      exposes: {
        "./personal_test": "./src/bootstrap",
      },
      remotes: {
        smartDocs: "personal_test@http://localhost:3005/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv({
      path: path.join(__dirname + `/.env.${process.env.NODE_ENV}`),
    }),
    // new ReactRefreshWebpackPlugin({
    //   exclude: [/node_modules/],
    // }),
  ],
};

module.exports = merge(commonConfig, devConfig);
