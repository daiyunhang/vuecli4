/* eslint-disable */
// const webpack = require("webpack");
// const MyWebpckPugin = require("./src/pulgin/MyWebpckPugin")
module.exports = {
    publicPath: './', // 默认'/'，部署应用包时的基本 URL
    outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: '',  // 相对于outputDir的静态资源(js、css、img、fonts)目录
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false,  // 生产环境的 source map
    lintOnSave: false,
    devServer: {
        host: '0.0.0.0',// 设置主机地址
        port: 8080,// 设置默认端口
        disableHostCheck: false, //禁用webpack热重载检查
        inline: false,  // 关闭热更新
        open: true, //配置自动启动浏览器
        proxy: {
            '/': {
                // 目标 API 地址
                target: 'http://39.106.230.46:7001/',     //生产环境
                // target: 'http://localhost:7001',     //开发环境
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    '^/': ""
                },
            }
        }
    },
    
    configureWebpack: {
        //关闭 webpack 的性能提示
        // performance: {
        //     hints:false
        // }
        //或者
        //警告 webpack 的性能提示
        //给一个大容量储存
        performance: {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        },
    }
}
