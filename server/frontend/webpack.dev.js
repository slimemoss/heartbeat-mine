const path = require('path')
const fs = require('fs')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/dist/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
    static: {
      directory: __dirname,
    },
    hot: true,
    liveReload: true,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) throw new Error('webpack-dev-server is not defined')

      devServer.app.get('/api/', (req, res) => {
        const filePath = path.join(__dirname, 'dev_data/data.json')
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            res.status(500).json({ error: 'Failed to read JSON file' })
            return
          }
          res.setHeader('Content-Type', 'application/json')
          res.send(data)
        })
      })

      return middlewares
    },
  },
})
