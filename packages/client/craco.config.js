const {
  when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES
} = require('@craco/craco');
const CracoLessPlugin = require('craco-less');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const WebpackBar = require('webpackbar')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('src'),
      '@dmp': pathResolve('src/comps/dmp'),
      // 此处是一个示例，实际可根据各自需求配置
    },
    plugins: [
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
        ], []
      ),
      // 查看打包的进度
      // new SimpleProgressWebpackPlugin(),
      // webpack构建进度条
      new WebpackBar({
        profile: true
      }),
      // 时间转换工具采取day替换moment
      // new AntdDayjsWebpackPlugin(),
    ]
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  },
  //抽离公用模块
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#007FDF' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};