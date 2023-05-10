const YAML = require('yamljs');
const logger = require('../utils/logger')

const swaggerDoc = YAML.load('./src/docs/swagger.yaml')
logger.debug(swaggerDoc)

module.exports = swaggerDoc
