const { StatusCodes } = require('http-status-codes')
const logger = require('../utils/logger')
const { redisClient } = require('../db/redis')

const test = async (req, res, next) => {
  const sessions = await redisClient.keys('*', (err, keys) => {
    keys.forEach((key) => console.log(key))
  }) 
  logger.info(`sessions: ${JSON.stringify(sessions)}`)
  res.status(StatusCodes.OK).send('test')
}

module.exports = {
  test
}