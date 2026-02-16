import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-400">
          Built with React, TypeScript, Tailwind CSS, and Google Gemini API.
        </p>
      </div>
    </footer>
  );
};