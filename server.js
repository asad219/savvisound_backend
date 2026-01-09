const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require("./middleware/errorHandler");
const logger = require('./config/logger');
const app = express();
const config = require('./config');

// Middleware
// HTTP request logging
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Security headers
app.use(helmet());

// Prevent NoSQL injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Body parsers for JSON and URL-encoded data
// JSON payloads
app.use(express.json({ limit: "5mb" }));

// URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
   origin: config.cors.origin,
   credentials: true
 }));

// Enable CORS pre-flight for all routes
app.options("*", cors());

// Connect to the database
const connectDb = require("./config/dbConnection");
const swaggerOptions = require('./config/swaggerConfig');
connectDb();

// Health check endpoint
const healthRoutes = require('./routes/healthRoutes');
app.use('/health', healthRoutes);

// Swagger documentation setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Centralized route registration
const routes = require('./routes');
app.use('/api/v2', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Server configuration
app.listen(config.port, () => {
  logger.info(`SavviSound API v${config.env === 'production' ? '2' : '2-dev'} is running on port ${config.port}`);
  logger.info(`Environment: ${config.env}`);
  logger.info(`API Documentation available at: http://localhost:${config.port}/api-docs`);
});
