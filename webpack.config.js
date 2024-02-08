const path = require("path");

module.exports = {
  target: "node",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      http: false,
      https: false,
      url: false,
    },
  },
};
