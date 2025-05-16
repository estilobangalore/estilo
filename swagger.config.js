export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Estilo API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Estilo web application',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
      {
        url: 'https://your-production-domain.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        sessionAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
        },
      },
    },
    security: [
      {
        sessionAuth: [],
      },
    ],
  },
  apis: ['./api/**/*.js'], // Path to the API routes
}; 