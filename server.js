// Development server with API handling
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiHandler from './api/index.js';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import swaggerConfig from './swagger.config.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = path.join(__dirname, 'dist/public');
const isDev = process.env.NODE_ENV !== 'production';

// Only use in-memory DB in development if explicitly configured
global.USE_IN_MEMORY_DB = isDev && process.env.USE_IN_MEMORY_DB === 'true';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});

async function startServer() {
  const app = express();
  
  // Enable compression
  app.use(compression());

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: isDev ? false : undefined,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));
  
  // Prevent parameter pollution
  app.use(hpp());

  // Cookie parser
  app.use(cookieParser());
  
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: !isDev,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // CORS configuration
  const corsOptions = {
    origin: isDev 
      ? ['http://localhost:3000', 'http://localhost:5173'] 
      : process.env.ALLOWED_ORIGINS?.split(',') || ['https://your-production-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));
  
  // Apply rate limiting to all routes
  app.use(limiter);
  
  // Parse JSON request bodies
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // API Documentation
  if (isDev) {
    const specs = swaggerJsdoc(swaggerConfig);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  // Add request logging
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (['POST', 'PUT'].includes(req.method) && req.body) {
      const sanitizedBody = { ...req.body };
      // Remove sensitive data from logs
      ['password', 'token', 'secret'].forEach(key => {
        if (sanitizedBody[key]) sanitizedBody[key] = '[REDACTED]';
      });
      console.log('Request body:', JSON.stringify(sanitizedBody, null, 2));
    }
    next();
  });
  
  // Handle all API routes
  app.all('/api/*', async (req, res) => {
    try {
      // Pass the request to our consolidated API handler
      console.log('Forwarding API request to handler:', req.method, req.url);
      
      // Fix the URL format for the API handler
      const originalUrl = req.url;
      req.url = originalUrl.replace(/\?.*$/, ''); // Remove query parameters for routing
      
      await apiHandler(req, res);
    } catch (error) {
      console.error('API request error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: isDev ? error.message : 'Something went wrong',
        stack: isDev ? error.stack : undefined
      });
    }
  });
  
  if (isDev) {
    // In development, create a Vite server for HMR
    const vite = await createViteServer({
      server: { middlewareMode: true },
      root: './client',
      appType: 'spa',
    });
    
    // Use Vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    // In production, serve static files
    app.use(express.static(PUBLIC_DIR));
    
    // For any route that doesn't match an API route or static file,
    // serve the SPA index.html to handle client-side routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
    });
  }
  
  // Global error handler
  app.use((err, req, res, next) => {
    console.error('Server error:', err);
    
    // Don't leak error details in production
    const error = {
      message: isDev ? err.message : 'Internal Server Error',
      ...(isDev && { stack: err.stack }),
      status: err.status || 500
    };

    res.status(error.status).json({ error });
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${isDev ? 'development' : 'production'}`);
    
    if (!isDev) {
      try {
        console.log('Files in public directory:');
        const fs = require('fs');
        const files = fs.readdirSync(PUBLIC_DIR);
        console.log(files);
      } catch (error) {
        console.error('Error listing directory:', error);
      }
    }
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
