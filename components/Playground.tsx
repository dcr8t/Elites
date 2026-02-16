import React, { useState, useCallback, useRef, useEffect } from 'react';
import { generateResponse } from '../services/geminiService';
import { LoadingState } from '../types';

export const Playground: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === LoadingState.LOADING) return;

    setStatus(LoadingState.LOADING);
    setResponse(null);

    try {
      const result = await generateResponse(input);
      setResponse(result);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setResponse("Failed to fetch response. Ensure your environment is configured correctly.");
      setStatus(LoadingState.ERROR);
    }
  }, [input, status]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 text-left">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-gemini animate-pulse"></span>
          AI Integration
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Power your application with <strong>gemini-3-flash-preview</strong>. Try asking for a component idea or a quick explanation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm focus-within:ring-2 focus-within:ring-gemini/50 focus-within:border-gemini transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Ask Gemini something..."
            className="w-full bg-transparent p-4 pr-16 resize-none focus:outline-none text-slate-900 dark:text-zinc-100 min-h-[56px] max-h-60"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || status === LoadingState.LOADING}
            className="absolute right-2 bottom-2 p-2 rounded-lg bg-gemini text-white disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95"
          >
            {status === LoadingState.LOADING ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {response && (
        <div className={`p-5 rounded-xl border ${status === LoadingState.ERROR ? 'bg-red-50 border-red-100 text-red-900 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-200' : 'bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700'} animate-in fade-in slide-in-from-top-2 duration-300`}>
          <div className="flex items-center gap-2 mb-3">
             <div className={`h-6 w-6 rounded-md flex items-center justify-center ${status === LoadingState.ERROR ? 'bg-red-200 text-red-700' : 'bg-gemini/20 text-gemini'}`}>
                {status === LoadingState.ERROR ? '!' : 'AI'}
             </div>
             <span className="text-xs font-bold uppercase tracking-wider opacity-60">
               {status === LoadingState.ERROR ? 'Error' : 'Response'}
             </span>
          </div>
          <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};