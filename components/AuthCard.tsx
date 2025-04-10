'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';
import { Github } from 'lucide-react';

type AuthCardProps = {
  view?: 'sign_in' | 'sign_up';
};

export function AuthCard({ view = 'sign_in' }: AuthCardProps) {
  const isSignIn = view === 'sign_in';

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden shadow-xl rounded-2xl border border-gray-100">
      {/* Header with purple gradient like homepage */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-8 text-center relative overflow-hidden">
        {/* Background pattern similar to homepage */}
        <div className="absolute top-0 right-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8">
              <path d="M400 0H600V600H0V400C0 179.086 179.086 0 400 0Z" fill="white" />
            </g>
          </svg>
        </div>
        
        {/* Logo similar to homepage header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-purple-500 flex items-center justify-center">
            <Github className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-white">
            Docs‑Gen
          </span>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">
          {isSignIn ? 'Welcome Back!' : 'Create Your Account'}
        </h1>
        <p className="text-sm text-purple-100 opacity-90">
          {isSignIn
            ? 'Sign in to access your documentation'
            : 'Get started with Docs-Gen today'}
        </p>
      </div>

      {/* Supabase Auth UI */}
      <div className="p-8 bg-white">
        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#7C3AED', // purple-600 to match homepage
                  brandAccent: '#6D28D9', // purple-700 to match homepage
                },
                radii: {
                  borderRadiusButton: '0.5rem',
                  inputBorderRadius: '0.5rem',
                },
              },
            },
            className: {
              container: 'auth-container',
              button: 'auth-button hover:shadow-md transition-shadow',
              divider: 'my-6',
              input: 'focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all',
            },
          }}
          providers={['github', 'google']}
          socialLayout="horizontal"
          redirectTo="/dashboard"
        />

        {/* Toggle between sign in and sign up with same styles as homepage links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <a 
              href={isSignIn ? "?view=sign_up" : "?view=sign_in"} 
              className="text-purple-600 hover:text-purple-800 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300 after:content-['']"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Docs‑Gen • All rights reserved
        </p>
      </div>
    </div>
  );
}