var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: path.join(__dirname, "js/app/index.js"),
    output: {
        path: path.join(__dirname, "../public"),
        filename: 'js/index.js'
    },
    module: {
        rules: [
            {
            test: /\.less$/,
            use: [ "style-loader" ,"css-loader"  ,"less-loader" ]
        }
    ]
    },



    resolve: {
        alias: {
            jquery: path.join(__dirname, "js/lib/jquery-3.3.1.min.js"),
            mod: path.join(__dirname, "js/mod"),
            less: path.join(__dirname, "less")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"  //全局使用$ 不需要再引入了 这里插件设置好了
        }),
    ]

}