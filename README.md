# Estilo Web Application

A modern web application built with React, Express, and PostgreSQL.

## Security Features

- **Helmet.js Integration**: Secure HTTP headers
- **Rate Limiting**: Protect against brute force attacks
- **CORS Protection**: Configurable origin restrictions
- **Session Management**: Secure session handling
- **Parameter Pollution Protection**: Prevents HTTP Parameter Pollution attacks
- **Request Size Limits**: Protects against large payload attacks
- **Sanitized Logging**: Removes sensitive data from logs
- **Production Error Handling**: Prevents leak of sensitive error details
- **Compression**: Enabled for better performance
- **Cookie Security**: HTTP-only and secure flags enabled

## Setup Instructions

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev:all
   ```

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `DATABASE_URL`: Neon PostgreSQL connection string
- `SESSION_SECRET`: Secret for session management
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window in milliseconds
- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window

## API Documentation

In development mode, API documentation is available at:
```
http://localhost:3001/api-docs
```

## Security Best Practices

1. Always use HTTPS in production
2. Regularly update dependencies
3. Monitor application logs for suspicious activity
4. Use environment variables for sensitive configuration
5. Keep session secret secure and unique per environment
6. Configure CORS for specific origins in production

## Development Guidelines

1. Use TypeScript for type safety
2. Follow ESLint rules
3. Write tests for new features
4. Document API endpoints using Swagger/OpenAPI
5. Use prepared statements for database queries
6. Validate all user inputs

## Production Deployment

1. Set secure environment variables
2. Enable HTTPS
3. Configure proper CORS origins
4. Set up monitoring and logging
5. Configure proper database connection pools
6. Enable production optimizations

## License

[Your License Here] 