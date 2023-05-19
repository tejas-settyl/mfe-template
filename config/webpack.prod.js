const { merge } = require("webpack-merge");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const domain = process.env.PRODUCTION_DOMAIN;
const cdnDomain = "https://cdngolive.settyl.com";
const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: domain,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "operationalPlanning",
      filename: "remoteEntry.js",
      exposes: {
        "./OperationalPlanningApp": "./src/bootstrap.js",
      },
      remotes: {
        smartDocs: `smartDocs@${cdnDomain}/smartdocs/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./public/images", to: "images" }],
    }),
    new Dotenv({
      path: path.join(__dirname + `/.env.${process.env.NODE_ENV}`),
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
