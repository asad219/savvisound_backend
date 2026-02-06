const mongoose = require("mongoose");
const logger = require('../config/logger');
const dns = require("node:dns/promises");

const dbConnect = async () => {
  try {
    const dnsServers = process.env.DNS_SERVERS 
      ? process.env.DNS_SERVERS.split(',') 
      : ["1.1.1.1", "8.8.8.8"];
    dns.setServers(dnsServers);
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    logger.info('Database connected: ', connect.connection.host, connect.connection.name);
  } catch (err) {
    logger.error('Database connection error: ', err);
    process.exit(1);
  }
};
module.exports = dbConnect;
