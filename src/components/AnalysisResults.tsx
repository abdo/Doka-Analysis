import React from 'react';
import type { AnalysisResponse, Priority } from '../types/analysis';
import type { Product } from '../types/product';
import dokaData from '../constants/doka-data';

interface AnalysisResultsProps {
  analysis: AnalysisResponse;
  onAnalyzeAnother: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onAnalyzeAnother }) => {
  // Get full product details for recommendations
  const getProduct = (id: string): Product | undefined => {
    return dokaData.products.find((p) => p.id === id);
  };

  // Group recommendations by priority
  const groupedRecommendations = {
    essential: analysis.recommendations.filter((r) => r.priority === 'essential'),
    recommended: analysis.recommendations.filter((r) => r.priority === 'recommended'),
    optional: analysis.recommendations.filter((r) => r.priority === 'optional'),
  };

  const priorityColors: Record<Priority, string> = {
    essential: 'bg-red-100 text-red-800 border-red-300',
    recommended: 'bg-blue-100 text-blue-800 border-blue-300',
    optional: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  const priorityLabels: Record<Priority, string> = {
    essential: 'Essential',
    recommended: 'Recommended',
    optional: 'Optional',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-doka-blue mb-2">Analysis Results</h2>
        <p className="text-gray-600">AI-powered formwork recommendations for your project</p>
      </div>

      {/* Structure Analysis */}
      <div className="bg-gradient-to-br from-doka-blue to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-blue-200 text-sm font-semibold mb-1">Structure Type</p>
            <p className="text-lg">{analysis.analysis.structureType}</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm font-semibold mb-1">Estimated Scale</p>
            <p className="text-lg">{analysis.analysis.estimatedScale}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-blue-200 text-sm font-semibold mb-1">Description</p>
            <p className="text-lg">{analysis.analysis.description}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-blue-200 text-sm font-semibold mb-1">Site Constraints</p>
            <p className="text-lg">{analysis.analysis.siteConstraints}</p>
          </div>
        </div>
      </div>

      {/* Identified Elements */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        <h3 className="text-2xl font-bold text-doka-blue mb-4">Identified Elements</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {analysis.identifiedElements.map((element, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-bold text-doka-blue mb-2">{element.element}</h4>
              <p className="text-gray-700 text-sm">{element.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formwork Recommendations */}
      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-doka-blue border-l-8 border-doka-yellow pl-4">
          Formwork Recommendations
        </h3>

        {(['essential', 'recommended', 'optional'] as Priority[]).map((priority) => {
          const recs = groupedRecommendations[priority];
          if (recs.length === 0) return null;

          return (
            <div key={priority} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm ${priorityColors[priority]}`}>
                  {priorityLabels[priority]}
                </span>
                <div className="h-px bg-gray-200 flex-grow"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {recs.map((rec) => {
                  const product = getProduct(rec.id);
                  if (!product) return null;

                  return (
                    <div
                      key={rec.id}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
                    >
                      {/* Image Header */}
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                          <h5 className="text-2xl font-bold text-white mb-1">{product.name}</h5>
                          <p className="text-white/90 text-sm font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded inline-block">
                            For: {rec.forElement}
                          </p>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Reason Box */}
                        <div className="bg-slate-50 rounded-xl p-4 mb-4 border-l-4 border-doka-blue">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-bold text-doka-blue block mb-1">Why this system?</span>
                            {rec.reason}
                          </p>
                        </div>

                        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                          {product.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {product.bestFor.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200"
                            >
                              {feature}
                            </span>
                          ))}
                          {product.bestFor.length > 3 && (
                            <span className="text-xs font-semibold bg-gray-50 text-gray-400 px-3 py-1.5 rounded-full border border-gray-200">
                              +{product.bestFor.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Notes */}
      {analysis.additionalNotes && (
        <div className="bg-amber-50 border-l-4 border-doka-yellow p-6 rounded-lg">
          <h4 className="text-lg font-bold text-doka-blue mb-2">Additional Notes</h4>
          <p className="text-gray-700">{analysis.additionalNotes}</p>
        </div>
      )}

      {/* Action Button */}
      <div className="text-center pt-4">
        <button
          onClick={onAnalyzeAnother}
          className="bg-doka-blue hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span>Analyze Another Image</span>
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
