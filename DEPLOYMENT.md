# Deployment Guide

## Prerequisites
1. A Vercel account (https://vercel.com)
2. A Neon account (https://neon.tech)
3. Node.js 18+ installed locally

## Setup Steps

### 1. Neon Database Setup
1. Create a new project in Neon
2. Get your database connection string from the dashboard
3. Make sure to note down:
   - Database URL
   - Project ID
   - Branch name (default is 'main')

### 2. Environment Variables
Set the following environment variables in your Vercel project:
```env
DATABASE_URL=your_neon_connection_string
NODE_ENV=production
```

### 3. Vercel Deployment
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. For subsequent deployments:
   ```bash
   vercel --prod
   ```

### 4. Database Migration
After deployment, run the database migrations:
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run migrations:
   ```bash
   npm run db:push
   ```

## Troubleshooting

### Database Connection Issues
- Ensure the `DATABASE_URL` is correctly set in Vercel
- Check if the IP is whitelisted in Neon dashboard
- Verify SSL configuration in database connection

### Build Issues
- Clear Vercel cache if needed: `vercel --clear-cache`
- Check build logs in Vercel dashboard
- Verify all dependencies are correctly listed in package.json

### Runtime Issues
- Check Vercel Function logs
- Verify environment variables
- Check for any rate limiting issues

## Monitoring
- Use Vercel Analytics for performance monitoring
- Check Neon dashboard for database metrics
- Monitor application logs in Vercel dashboard

## Important Notes
1. Always use environment variables for sensitive information
2. Keep dependencies updated
3. Monitor database connection pool
4. Regular backups are recommended
5. Use proper error handling in production 