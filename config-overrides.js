/**
 * antd用来修改webpack配置的文件
 */
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');

module.exports = override(
  // 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 自定义主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  // 编译装饰器语法  库中已经实现无需再配置
  // addBabelPlugins(
  //   [
  //     "@babel/plugin-proposal-decorators",
  //     {
  //       "legacy": true
  //     }
  //   ]
  // )
  addDecoratorsLegacy()   //返回值即为addBabelPlugins配置
);