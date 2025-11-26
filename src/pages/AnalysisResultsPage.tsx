import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnalysisResults from "../components/AnalysisResults";
import Header from "../components/Header";
import type { AnalysisResponse } from "../types/analysis";

const AnalysisResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get analysis data and image URL from navigation state
  const analysis = location.state?.analysis as AnalysisResponse | undefined;
  const imageUrl = location.state?.imageUrl as string | undefined;

  // Cleanup the object URL when component unmounts
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleAnalyzeAnother = () => {
    navigate("/");
  };

  // If no analysis data, redirect to home
  if (!analysis) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <AnalysisResults
          analysis={analysis}
          imageUrl={imageUrl}
          onAnalyzeAnother={handleAnalyzeAnother}
        />
      </main>

      {/* Footer */}
      <footer className="bg-doka-blue text-white py-6 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-blue-200">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold">Doka Analysis</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AnalysisResultsPage;
