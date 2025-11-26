import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-24 h-24 border-8 border-white/30 rounded-full"></div>
        {/* Spinning ring */}
        <div className="w-24 h-24 border-8 border-doka-yellow border-t-transparent rounded-full animate-spin absolute top-0 left-0 shadow-lg"></div>
      </div>

      <div className="mt-8 text-center max-w-md">
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
          Analyzing Your Construction Project
        </h3>
        <p className="text-gray-100 drop-shadow-md">
          Our AI is examining the image and selecting the best formwork
          solutions...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
