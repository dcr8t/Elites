import React, { useState, useCallback } from 'react';
import { generateResponse } from '../services/geminiService';
import { LoadingState } from '../types';
import { Button } from './Button';

export const Playground: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setStatus(LoadingState.LOADING);
    setResponse(null);

    try {
      const result = await generateResponse(input);
      setResponse(result);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setResponse("An error occurred while communicating with the Gemini API. Please check the console for details.");
      setStatus(LoadingState.ERROR);
    }
  }, [input]);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">API Playground</h3>
        <p className="text-sm text-slate-500 mt-1">
          Enter a prompt below to see how the Gemini model responds.
        </p>
      </div>
      
      <div className="p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-700">
              Your Prompt
            </label>
            <div className="mt-1">
              <textarea
                id="prompt"
                name="prompt"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-3 text-slate-900 placeholder-slate-400 border"
                placeholder="e.g., Explain quantum computing to a 5-year-old..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status === LoadingState.LOADING}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Model: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded">gemini-3-flash-preview</span>
            </div>
            <Button 
              type="submit" 
              isLoading={status === LoadingState.LOADING}
              disabled={!input.trim()}
            >
              Generate Response
            </Button>
          </div>
        </form>

        {/* Results Area */}
        <div className={`transition-all duration-300 ease-in-out ${response || status === LoadingState.ERROR ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
           <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-slate-500">Result</span>
              </div>
            </div>

            <div className={`mt-6 rounded-lg p-4 ${status === LoadingState.ERROR ? 'bg-red-50 border border-red-200' : 'bg-indigo-50 border border-indigo-100'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {status === LoadingState.ERROR ? (
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className={`text-sm font-medium ${status === LoadingState.ERROR ? 'text-red-800' : 'text-indigo-800'}`}>
                    {status === LoadingState.ERROR ? 'Error' : 'Gemini Output'}
                  </h3>
                  <div className={`mt-2 text-sm ${status === LoadingState.ERROR ? 'text-red-700' : 'text-slate-700'} whitespace-pre-wrap leading-relaxed`}>
                    {response}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};