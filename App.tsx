import React from 'react';
import { Header } from './components/Header';
import { Playground } from './components/Playground';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-start pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Build faster with</span>{' '}
              <span className="block text-indigo-600 xl:inline">Gemini & React</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              This is a production-ready starter template designed to help you integrate Google's Gemini API into your React applications with TypeScript and Tailwind CSS.
            </p>
          </div>

          <Playground />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;