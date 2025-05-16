export const config = {
  // API configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Authentication
  authTokenKey: 'auth_token',
  sessionTimeout: 3600000, // 1 hour in milliseconds
  
  // Application settings
  appName: 'Beautiful Interiors',
  defaultTheme: 'light',
  
  // Feature flags
  features: {
    enableDarkMode: true,
    enableNotifications: true,
  },
  
  // API endpoints
  endpoints: {
    auth: {
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      register: '/api/auth/register',
    },
    user: {
      profile: '/api/user/profile',
      settings: '/api/user/settings',
    },
  },
} as const;

// Type definitions
export type Config = typeof config;

// Helper functions
export const getApiUrl = (path: string): string => {
  return `${config.apiBaseUrl}${path}`;
};

export default config;
