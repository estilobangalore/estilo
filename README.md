# Estilo Web Application

A modern web application for interior design and decoration services, built with React, Express, and PostgreSQL.

## Prerequisites

- Node.js 18+
- PostgreSQL (Neon)
- npm or yarn

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```

2. Set up your Neon database:
   - Create a project at https://neon.tech
   - Get your connection string
   - Add it to your `.env` file

3. Run database migrations:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev:all
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgres://user:password@db.example.neon.tech/dbname?sslmode=require

# Server Configuration
PORT=3001
NODE_ENV=development

# Security
SESSION_SECRET=your-session-secret-here
CORS_ORIGIN=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,https://your-production-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# Client Configuration
VITE_API_URL=http://localhost:3001/api
```

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

## Development

- `npm run dev:all` - Start both client and server in development mode
- `npm run dev` - Start only the client
- `npm run dev:api` - Start only the server
- `npm run build` - Build the client
- `npm run db:push` - Run database migrations
- `npm run db:studio` - Open database management UI

## Project Structure

```
├── client/             # React frontend
│   ├── src/           # Source files
│   ├── public/        # Static files
│   └── dist/          # Build output
├── server/            # Express backend
│   ├── routes/        # API routes
│   └── config/        # Server configuration
├── shared/            # Shared code
├── scripts/          
│   └── db/           # Database scripts
└── migrations/        # Database migrations
```

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

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions on Vercel with Neon database.

## License

This project is licensed under the MIT License. 