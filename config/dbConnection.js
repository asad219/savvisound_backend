const mongoose = require("mongoose");
const logger = require('../config/logger');

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    logger.info('Database connected: ', connect.connection.host, connect.connection.name);
  } catch (err) {
    logger.error('Database connection error: ', err);
    process.exit(1);
  }
};
module.exports = dbConnect;