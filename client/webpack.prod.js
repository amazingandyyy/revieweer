const webpack = require('webpack');
const merge = require('webpack-merge');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'SERVERURI': JSON.stringify('server.revieweer.com')
            }
        }),
        // new UglifyJsPlugin({
        //     sourceMap: true,
        //     uglifyOptions: {
        //       ecma:8,  
        //       compress: {
        //         warnings: false
        //       }
        //     }
        //   })
    ]
})