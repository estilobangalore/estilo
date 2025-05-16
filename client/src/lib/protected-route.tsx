import React from 'react';
import { Route, RouteProps } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ComponentType<any>;
}

export function ProtectedRoute({ component: Component, ...rest }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    window.location.href = '/auth';
    return null;
  }

  return <Route {...rest} component={Component} />;
}
