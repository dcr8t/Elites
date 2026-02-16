import React, { useState } from 'react';
import { Playground } from './components/Playground';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <div className="flex justify-center gap-8 mb-12">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="https://vitejs.dev/logo.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" 
            className="logo react" 
            alt="React logo" 
          />
        </a>
        <a href="https://ai.google.dev" target="_blank" rel="noreferrer">
          <svg className="logo gemini w-24 h-24 text-gemini" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
          </svg>
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-8 tracking-tight">Vite + React + Gemini</h1>

      <div className="card p-8 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl w-full">
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            count is {count}
          </button>
          
          <p className="text-slate-500 dark:text-zinc-400">
            Edit <code className="font-mono bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 rounded">App.tsx</code> and save to test HMR
          </p>
        </div>

        <div className="mt-12 pt-12 border-t border-slate-200 dark:border-zinc-800">
          <Playground />
        </div>
      </div>

      <p className="mt-12 text-slate-400 dark:text-zinc-500 text-sm">
        Click on the Vite, React and Gemini logos to learn more
      </p>
    </div>
  );
};

export default App;