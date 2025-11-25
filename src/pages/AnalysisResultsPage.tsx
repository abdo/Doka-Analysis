import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnalysisResults from '../components/AnalysisResults';
import Header from '../components/Header';
import type { AnalysisResponse } from '../types/analysis';

const AnalysisResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get analysis data from navigation state
  const analysis = location.state?.analysis as AnalysisResponse | undefined;

  // If no analysis data, redirect to home
  if (!analysis) {
    navigate('/');
    return null;
  }

  const handleAnalyzeAnother = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <AnalysisResults analysis={analysis} onAnalyzeAnother={handleAnalyzeAnother} />
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

export default AnalysisResultsPage;
