import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import { analyzeImage } from '../services/openai.service';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeImage(file);
      // Navigate to analysis page with the result
      navigate('/analysis', { state: { analysis: result } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {isAnalyzing ? (
          <LoadingSpinner />
        ) : (
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

            {error && (
              <div className="mt-8 max-w-2xl mx-auto">
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
                    onClick={() => setError(null)}
                    className="bg-doka-blue hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

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

export default HomePage;
