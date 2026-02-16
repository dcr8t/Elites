import React from 'react';
import { APP_NAME } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <svg 
              className="h-8 w-8 text-indigo-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-slate-900 tracking-tight">
              {APP_NAME}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://ai.google.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Gemini API Docs
            </a>
            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              React Docs
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};