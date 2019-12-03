import routes from "./src/pages/routes";
import config from './config';
import path from 'path';

console.log('Development...')
export default {
  // 环境变量
  context: {
    title: 'UMI+DVA详解',
  },
  
  define: {
    "process.env.ENV": process.env.UMI_ENV === 'prod' ? 'production' : 'development',
  },
  alias: {
    '@assets': path.resolve(__dirname, './src/assets'),
    '@config': path.resolve(__dirname, './config'),
    '@lib': path.resolve(__dirname, './src/pages/lib'),
    '@layouts': path.resolve(__dirname, './src/layouts'),
    '@service': path.resolve(__dirname, './src/service'),
  },
  base: '',
  routes: routes,
  history: 'hash',
  cssModulesExcludes: config.cssExclude,
  lessLoaderOptions: {
    test: /\.less$/,
    loader: 'less-loader', // compiles Less to CSS
  },
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: {
        immer: true
      },
      dynamicImport: {
        webpackChunkName: true,
      },
      title: '',
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
