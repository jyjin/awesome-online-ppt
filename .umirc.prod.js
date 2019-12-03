console.log('Production...')
export default {
  define: {
    "process.env.ENV": process.env.UMI_ENV === 'prod' ? 'production' : 'development',
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: {
        immer: true
      },
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './pages/component/loading/loading',
      },
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}