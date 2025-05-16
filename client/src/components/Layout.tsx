import React from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold">Beautiful Interiors</a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/portfolio">
              <a className="hover:text-primary">Portfolio</a>
            </Link>
            <Link href="/calculator">
              <a className="hover:text-primary">Calculator</a>
            </Link>
            <Link href="/booking">
              <a className="hover:text-primary">Book Now</a>
            </Link>
            <Link href="/contact">
              <a className="hover:text-primary">Contact</a>
            </Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link href="/admin">
                    <a className="hover:text-primary">Admin</a>
                  </Link>
                )}
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth">
                <a className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                  Login
                </a>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Beautiful Interiors. All rights reserved.
          </p>
        </div>
      </footer>
      <WhatsAppButton phoneNumber="+919794513786" />
    </div>
  );
} 