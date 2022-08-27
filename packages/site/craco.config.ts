const { whenProd } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
const WebpackBar = require("webpackbar");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const pathResolve = (pathUrl: any) => path.join(__dirname, pathUrl);

module.exports = {
  webpack: {
    alias: {
      "@": pathResolve("src"),
      // 此处是一个示例，实际可根据各自需求配置
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      // new CompressionWebpackPlugin({
      //   filename: "[path].gz[query]",
      //   algorithm: "gzip",
      //   test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
      //   threshold: 1024,
      //   minRatio: 0.8,
      // }),
      ...whenProd(
        () => [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true,
              },
            },
            sourceMap: false,
            parallel: true,
          }),
        ],
        []
      ),
      // 查看打包的进度
      // new SimpleProgressWebpackPlugin(),
      // webpack构建进度条
      new WebpackBar({
        profile: true,
      }),
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" }, //主题颜色
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true, //设置为true即是less
        },
      ],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  },

  //抽离公用模块
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  style: {
    postOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
