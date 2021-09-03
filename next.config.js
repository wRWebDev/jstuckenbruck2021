const webpack = require('webpack')
require('dotenv').config()

module.exports = {
    webpack: (config, { isServer }) => {
        const env = Object.keys(process.env).reduce((acc, curr) => {
            acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
            return acc
        }, {})

        config.plugins.push(new webpack.DefinePlugin(env))
        
        return config
    },
    images: {
        domains: ['jstuckenbruck2021.s3.eu-west-2.amazonaws.com'],
    },
}