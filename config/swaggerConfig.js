const config = require('./index');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SavviSound API',
      version: '2.0.0',
      description: 'API documentation for SavviSound Backend Services',
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v2`,
        description: 'Development server',
      },
      {
        url: 'https://savvisound.com/api/v2',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js', './docs/*.js'], // Path to the API docs
};

module.exports = swaggerOptions;