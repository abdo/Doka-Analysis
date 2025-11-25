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

      {/* Product Recommendations */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-doka-blue">Product Recommendations</h3>

        {(['essential', 'recommended', 'optional'] as Priority[]).map((priority) => {
          const recs = groupedRecommendations[priority];
          if (recs.length === 0) return null;

          return (
            <div key={priority}>
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm border ${priorityColors[priority]}`}>
                  {priorityLabels[priority]}
                </span>
                <span>({recs.length})</span>
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                {recs.map((rec) => {
                  const product = getProduct(rec.id);
                  if (!product) return null;

                  return (
                    <div
                      key={rec.id}
                      className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${priorityColors[priority]}`}>
                          {priorityLabels[priority]}
                        </div>
                      </div>

                      <div className="p-6">
                        <h5 className="text-xl font-bold text-doka-blue mb-2">{product.name}</h5>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-500 font-semibold mb-1">For: {rec.forElement}</p>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-doka-blue p-3 mb-4 rounded">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-doka-blue">Why: </span>
                            {rec.reason}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {product.bestFor.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-doka-yellow text-doka-blue px-2 py-1 rounded-full font-medium"
                            >
                              {feature}
                            </span>
                          ))}
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
