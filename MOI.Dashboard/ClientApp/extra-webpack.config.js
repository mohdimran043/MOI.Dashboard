const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                include: [
                    path.resolve(__dirname, 'node_modules\/jsonlint-lines\/lib')
                ],
                test: /\.js$/,
                use: [
                    {
                        loader: 'transform-loader?brfs'
                    }
                ]
            }
        ]
    }
}