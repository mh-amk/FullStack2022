const app = require("./App")
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
server.listen(config.PORT, () => logger.info(`Server Running on Port ${config.PORT}`))
