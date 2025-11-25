import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-24 h-24 border-8 border-gray-200 rounded-full"></div>
        {/* Spinning ring */}
        <div className="w-24 h-24 border-8 border-doka-yellow border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold text-doka-blue mb-2">Analyzing Your Construction Project</h3>
        <p className="text-gray-600">Our AI is examining the image and selecting the best formwork solutions...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
