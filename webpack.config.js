module.exports = {
  mode: "production",
  devtool: "source-map",
  externals: [
    {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react",
      },
    },
  ],
  entry: "./src/use-changed-props.ts",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    library: "useChangedProps",
    libraryTarget: "umd",
    filename:
      process.env.NODE_ENV === "production"
        ? "use-changed-props.min.js"
        : "use-changed-props.js",
    globalObject: "this",
    libraryExport: "default",
  },
}
