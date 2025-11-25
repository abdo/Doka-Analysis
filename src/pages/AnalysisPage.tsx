import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import AnalysisResults from '../components/AnalysisResults';
import { analyzeImage } from '../services/openai.service';
import type { AnalysisResponse } from '../types/analysis';

type AppState = 'upload' | 'analyzing' | 'results' | 'error';

const AnalysisPage: React.FC = () => {
  const [state, setState] = useState<AppState>('upload');
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    setState('analyzing');
    setError(null);

    try {
      const result = await analyzeImage(file);
      setAnalysis(result);
      setState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setState('error');
    }
  };

  const handleAnalyzeAnother = () => {
    setState('upload');
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-doka-yellow to-amber-400 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Doka Logo */}
            <svg
              id="Ebene_1"
              data-name="Ebene 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 277.8 82.66"
              className="h-10 w-auto drop-shadow-md transition-transform hover:scale-105 duration-300"
            >
              <defs>
                <style>{`
                  .logo_cls-1 { fill: #fd0; }
                  .logo_cls-1, .logo_cls-2 { stroke-width: 0px; }
                  .logo_cls-2 { fill: #004588; }
                `}</style>
              </defs>
              <rect className="logo_cls-1" width="277.8" height="82.66"></rect>
              <g>
                <path className="logo_cls-2" d="m114.13,43.46l-2.08,10.24s-24.23,0-25.47,0c.93-4.59,2.05-10.11,2.08-10.24h25.47Zm8.08,10.73l7.09-34.89h-10.21l-2.89,14.22h-26.35c-4.96,0-9.91,4.58-11.05,10.23l-1.93,9.46c-1.14,5.66,1.95,10.24,6.91,10.24h25.56s12.87-9.26,12.87-9.26Zm40.14-10.73l-2.08,10.24c-2.33,0-25.45,0-25.45,0,.59-2.92,1.55-7.56,2.08-10.24h25.45Zm9.94.29c1.16-5.66-1.97-10.24-6.99-10.24h-27.16c-5.02,0-10.03,4.58-11.19,10.24l-1.95,9.46c-1.16,5.66,1.97,10.24,6.99,10.24h25.25l12.85-9.25c.1-.32.18-.66.25-.99l1.95-9.46Zm41.66-9.77l.1-.47h-15.07l-13.42,9.66h-.35s4.85-23.87,4.85-23.87h-10.21l-8.97,44.15h10.21l2.27-11.2h.38l12.88,11.2h15.01l.1-.47-17.24-14.99,19.46-13.99Zm38.19-.47h-27.81c-5.02,0-10.03,4.58-11.19,10.24l-1.9,9.46c-1.16,5.66,1.92,10.24,6.94,10.24h13.03s11.86-9.27,11.86-9.27l.09-.47h-21.92c.44-2.17,1.44-7.12,2.07-10.24h25.4l-4.06,19.98h10.47l4.11-20.26c.84-5.39-2.24-9.67-7.1-9.67"></path>
                <g>
                  <polygon className="logo_cls-2" points="37.44 24.75 25.58 34.05 25.58 39.99 37.44 33.07 56.53 42.02 56.53 37.62 37.44 24.75"></polygon>
                  <polygon className="logo_cls-2" points="63.16 52.9 37.44 47.96 25.58 50.8 25.58 56.81 63.16 56.81 63.16 52.9"></polygon>
                  <polygon className="logo_cls-2" points="63.16 46.81 37.44 36.26 25.58 42.31 25.58 48.88 37.44 44.97 63.16 51.45 63.16 46.81"></polygon>
                  <polygon className="logo_cls-2" points="18.95 63.44 18.95 19.22 63.16 19.22 63.16 42.02 59.97 42.02 59.97 22.41 22.13 22.41 22.13 60.26 63.16 60.26 63.16 63.44 18.95 63.44"></polygon>
                </g>
              </g>
            </svg>
            <h1 className="text-2xl font-bold text-doka-blue tracking-tight">Analysis</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {state === 'upload' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-doka-blue mb-4 tracking-tight">
                AI-Powered Formwork Analysis
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload your construction drawings or site photos and get instant AI recommendations for the best Doka formwork solutions.
              </p>
            </div>

            <ImageUpload onImageSelect={handleImageSelect} />

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-doka-yellow">
                <div className="text-doka-blue mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-doka-blue mb-2">Upload Image</h3>
                <p className="text-gray-600 text-sm">Construction drawings, blueprints, or site photos</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-doka-blue">
                <div className="text-doka-yellow mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-doka-blue mb-2">AI Analysis</h3>
                <p className="text-gray-600 text-sm">Powered by OpenAI Vision to understand your project</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-doka-yellow">
                <div className="text-doka-blue mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.25m-12 0A2.25 2.25 0 005.25 21h8.25" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-doka-blue mb-2">Get Recommendations</h3>
                <p className="text-gray-600 text-sm">Tailored product suggestions with detailed reasoning</p>
              </div>
            </div>
          </div>
        )}

        {state === 'analyzing' && <LoadingSpinner />}

        {state === 'results' && analysis && (
          <AnalysisResults analysis={analysis} onAnalyzeAnother={handleAnalyzeAnother} />
        )}

        {state === 'error' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 text-red-500 mx-auto mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-red-800 mb-2">Analysis Failed</h3>
              <p className="text-red-700 mb-6">{error}</p>
              <button
                onClick={handleAnalyzeAnother}
                className="bg-doka-blue hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-doka-blue text-white py-6 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-blue-200">
            &copy; {new Date().getFullYear()} <span className="font-semibold">Doka GmbH</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AnalysisPage;
